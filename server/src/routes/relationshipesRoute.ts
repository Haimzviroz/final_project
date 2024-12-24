import { Router } from "express";

import {
    getTopGroupsganizations,
    getGroupByYear,
    getHighestCasualtyRegions,
    getByGroup as getYearsByGroup,
} from "../controllers/relationshipesController";

const relationshipesRouter = Router();

relationshipesRouter.get("/top-groups/:region_txt", getTopGroupsganizations);
relationshipesRouter.get("/groups-by-year/:iyear", getGroupByYear);
relationshipesRouter.get("/groups-by-organization/:gname", getYearsByGroup);
relationshipesRouter.get(
    "/deadliest-regions/:gname",
    getHighestCasualtyRegions
);

export default relationshipesRouter;
