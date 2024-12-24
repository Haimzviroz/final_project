import { Request, Response } from "express";
import {
    GetTopGroupsganizations,
    GetGroupByYear,
    GetHighestCasualtyRegions,
    GetByGroup,
} from "../services/relationshipsSevices";

export const getTopGroupsganizations = async (req: Request, res: Response) => {
    try {
        const { region_txt } = req.params;
        const result = await GetTopGroupsganizations(region_txt);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching :", error);
        res.status(500).json({ error: "Failed to fetch " });
    }
};
export const getGroupByYear = async (req: Request, res: Response) => {
    try {
        const { iyear } = req.params;
        const result = await GetGroupByYear(Number(iyear));
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching :", error);
        res.status(500).json({ error: "Failed to fetch " });
    }
};
export const getByGroup = async (req: Request, res: Response) => {
    try {
        const { gname } = req.params;
        const result = await GetByGroup(gname);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching :", error);
        res.status(500).json({ error: "Failed to fetch " });
    }
}
export const getHighestCasualtyRegions = async (
    req: Request,
    res: Response
) => {
    try {
        const { gname } = req.params;
        const result = await GetHighestCasualtyRegions(gname);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching :", error);
        res.status(500).json({ error: "Failed to fetch " });
    }
};
