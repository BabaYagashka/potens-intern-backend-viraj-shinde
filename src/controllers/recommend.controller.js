import Item from "../models/item.model.js";
import { calculateScore } from "../services/recommend.service.js";
import { generateReason } from "../utils/reason.js";

export const getRecommendations = async (req, res) => {
  try {
    const profile = req.body;

    const items = await Item.find().lean();

    const scored = items.map((item) => {
      const score = calculateScore(profile, item);
      const reason = generateReason(profile, item);

      return { ...item, score, reason };
    });

    scored.sort((a, b) => b.score - a.score);

    const top3 = scored.slice(0, 3);

    res.json({
      recommendations: top3.map((item) => ({
        item_id: item._id,
        title: item.title,
        score: item.score,
        reason: item.reason,
      })),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
