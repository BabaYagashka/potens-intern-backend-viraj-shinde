import express from "express";
import { getRecommendations } from "../controllers/recommend.controller.js";

const router = express.Router();

router.post("/recommend", getRecommendations);

export default router;
