import { Router } from "express";
import {
    getdeadliest,
    getHighestRegions,
    getAnnualFrequency,
    getMultiYearFrequency,
} from "../controllers/analysisController";

const analysisRouter = Router();
analysisRouter.get("/deadliest-attack-types", getdeadliest);
analysisRouter.get("/highest-casualty-regions", getHighestRegions);
analysisRouter.get("/incident-trends/:iyear", getAnnualFrequency);
analysisRouter.get("/incident-trends", getMultiYearFrequency);

export default analysisRouter;
