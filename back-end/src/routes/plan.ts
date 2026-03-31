import { Router, type Request, type Response } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { desc, eq } from "drizzle-orm";
import { auth } from "../lib/auth";
import db from "../db";
import { trainingPlans, userProfiles } from "../db/schema";
import { generateTrainingPlan } from "../lib/generatingPlanAi";

export const planRouter = Router();

planRouter.post("/generate", async (req: Request, res: Response) => {
    console.log(req.body)
  try {
    // Récupère la session Better Auth
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Récupère l'id du user connecté
    const userId = session.user.id;

    // Récupère le profil utilisateur
    const [profile] = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.userId, userId));

    if (!profile) {
      return res.status(400).json({
        error: "User profile not found. Complete onboarding first.",
      });
    }

    // Récupère le dernier plan pour calculer la prochaine version
    const [latestPlan] = await db
      .select({
        version: trainingPlans.version,
      })
      .from(trainingPlans)
      .where(eq(trainingPlans.userId, userId))
      .orderBy(desc(trainingPlans.createdAt))
      .limit(1);

    const nextVersion = latestPlan ? latestPlan.version + 1 : 1;

    let planJson;

    try {
      // Génère le plan avec OpenAI
      planJson = await generateTrainingPlan(profile);
    } catch (error) {
      console.error("AI generation failed:", error);
      return res.status(500).json({
        error: "Failed to generate training plan. Please try again.",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }

    // Version texte du plan pour stockage
    const planText = JSON.stringify(planJson, null, 2);

    // Sauvegarde du plan en base
    const [newPlan] = await db
      .insert(trainingPlans)
      .values({
        userId,
        planJson,
        planText,
        version: nextVersion,
      })
      .returning();

    if (!newPlan) {
      return res.status(500).json({
        error: "Failed to save generated plan",
      });
    }

    // Réponse envoyée au frontend
    return res.status(200).json({
      id: newPlan.id,
      version: newPlan.version,
      createdAt: newPlan.createdAt,
      planJson: newPlan.planJson,
    });
  } catch (error) {
    console.error("Error generating plan:", error);
    return res.status(500).json({ error: "Failed to generate plan" });
  }
});

planRouter.get("/current", async (req: Request, res: Response) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = session.user.id;

    const [currentPlan] = await db
      .select()
      .from(trainingPlans)
      .where(eq(trainingPlans.userId, userId))
      .orderBy(desc(trainingPlans.createdAt))
      .limit(1);

    if (!currentPlan) {
      return res.status(404).json({ error: "No training plan found" });
    }

    return res.status(200).json({
      id: currentPlan.id,
      userId: currentPlan.userId,
      version: currentPlan.version,
      createdAt: currentPlan.createdAt,
      planJson: currentPlan.planJson,
    });
  } catch (error) {
    console.error("Error fetching current plan:", error);
    return res.status(500).json({ error: "Failed to fetch current plan" });
  }
});