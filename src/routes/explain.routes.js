import express from "express";
import { explainItem } from "../controllers/explain.controller.js";

const router = express.Router();

router.get("/explain/:id", explainItem);

export default router;
