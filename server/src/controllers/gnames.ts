import { Request, Response } from "express";
import { GetAllGnames } from "../services/allGnames";

export const getGnames = async (req: Request, res: Response) => {
    try {
        const result = await GetAllGnames();
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching :", error);
        res.status(500).json({ error: "Failed to fetch " });
    }
};
