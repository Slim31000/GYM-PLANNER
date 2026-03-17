import { Router, type Request, type Response } from "express";

export const profileRouter = Router();


profileRouter.post("/", async(req: Request, res: Response) => {
    try {
        const {}= req.body
    } catch (error) {
        console.error("Error saving profile:", error);
        res.status(500).json({ error: "An error occurred while saving the profile" });
    }
})