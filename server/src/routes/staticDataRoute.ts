import { Router } from "express";
import { getGnames } from "../controllers/gnames";


const staticDataRouter = Router();

staticDataRouter.get("/gnames", getGnames);


export default staticDataRouter;