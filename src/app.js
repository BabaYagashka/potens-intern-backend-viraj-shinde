import express from "express";
import recommendRoutes from "./routes/recommend.routes.js";

const app = express();

app.use(express.json());
app.use("/api", recommendRoutes);

export default app;
