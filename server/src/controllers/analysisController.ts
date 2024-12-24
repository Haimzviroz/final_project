import {
    GetdeadliestAttackTypes,
    GetAnnualFrequency,
    GetHighestCasualtyRegions,
    GetMultiYearFrequency,
} from "../services/analysisServices";
import { Request, Response } from "express";
import { parsestrtonum } from "../utils/parsestrtonum";

export const getdeadliest = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const result = await GetdeadliestAttackTypes();
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching :", error);
        res.status(500).json({ error: "Failed to fetch" });
    }
};

export const getHighestRegions = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const result = await GetHighestCasualtyRegions();
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching :", error);
        res.status(500).json({ error: "Failed to fetch " });
    }
};
export const getAnnualFrequency = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { iyear } = req.params;
        const result = await GetAnnualFrequency(Number(iyear));
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching :", error);
        res.status(500).json({ error: "Failed to fetch " });
    }
};

export const getMultiYearFrequency = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { min, max, last } = req.query;
        const result = await GetMultiYearFrequency(
            parsestrtonum(min),
            parsestrtonum(max),
            parsestrtonum(last)
        );
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching :", error);
        res.status(500).json({ error: "Failed to fetch " });
    }

};
