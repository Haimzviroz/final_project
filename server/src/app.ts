import express from "express";
import cross from "cors";
import { config } from "dotenv";
import connectDB from "./config/db";
import analysisRouter from "./routes/analysisRoute";
import relationshipesRouter from "./routes/relationshipesRoute";
import staticDataRouter from "./routes/staticDataRoute";

config();
connectDB();

const app = express();
app.use(cross());
app.use(express.json());

app.use("/api/analysis", analysisRouter);
app.use("/api/relationships", relationshipesRouter);
app.use("/api/staticData", staticDataRouter);
const PORT = process.env.PORT || 3000;
export const server = app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
});
export default app;
