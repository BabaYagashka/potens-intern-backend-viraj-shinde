import Item from "../models/item.model.js";
import { calculateScore, isEligible } from "../services/recommend.service.js";
import { generateReason } from "../utils/reason.js";

export const getRecommendations = async (req, res) => {
  try {
    const profile = req.body;

    const items = await Item.find().lean();

    // NEW: only score items the profile actually qualifies for
    const eligibleItems = items.filter((item) => isEligible(profile, item));

    if (eligibleItems.length === 0) {
      return res.json({
        recommendations: [],
        message:
          "No items in the catalogue currently meet your minimum experience, skill, and salary requirements.",
      });
    }

    const scored = eligibleItems.map((item) => {
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
