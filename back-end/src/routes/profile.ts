import { Router, type Request, type Response } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth";
import db from "../db";
import { userProfiles } from "../db/schema";
import { success } from "better-auth";
import { eq } from "drizzle-orm";

export const profileRouter = Router();

profileRouter.post("/", async (req: Request, res: Response) => {
  try {
    const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const userId = session.user.id;
    const profileData = req.body;

    const {
      goal,
      experience,
      daysPerWeek,
      sessionLength,
      equipment,
      injuries,
      preferredSplit,
    }= profileData;

    if(!goal || !experience || !daysPerWeek || !sessionLength || !equipment || !preferredSplit) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const [savedProfile] = await db
  .insert(userProfiles)
  .values({
    userId,
    goal,
    experience,
    daysPerWeek,
    sessionLength,
    equipment,
    injuries: injuries || null,
    preferredSplit,
  })
  .onConflictDoUpdate({
    target: userProfiles.userId,
    set: {
      goal,
      experience,
      daysPerWeek,
      sessionLength,
      equipment,
      injuries: injuries || null,
      preferredSplit,
      updatedAt: new Date(),
    },
  })
  .returning();
  res.status(200).json({success: true,profile:savedProfile});
  } catch (error) {
    console.error("Error saving profile:", error);
    res
      .status(500)
      .json({ error: "An error occurred while saving the profile" });
  }
});

profileRouter.get("/current", async (req: Request, res: Response) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = session.user.id;

    const [profile] = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.userId, userId))
      .limit(1);

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    return res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({ error: "Failed to fetch profile" });
  }
});
