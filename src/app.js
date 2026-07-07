import express from "express";
import recommendRoutes from "./routes/recommend.routes.js";
import itemRoutes from "./routes/item.routes.js";
import explainRoutes from "./routes/explain.routes.js";

const app = express();

app.use(express.json());
app.use("/api", recommendRoutes);
app.use("/api", itemRoutes);
app.use("/api", explainRoutes);

export default app;
