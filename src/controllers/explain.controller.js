import Item from "../models/item.model.js";

export const explainItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).lean();

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    let explanation = [];

    if (item.required_skills.length > 0) {
      explanation.push(
        `requires skills like ${item.required_skills.join(", ")}`,
      );
    }

    explanation.push(
      `accepts candidates with at least ${item.min_experience} year(s) of experience`,
    );

    explanation.push(`is based in ${item.location}`);

    explanation.push(
      `offers salary between ${item.salary_range[0]} and ${item.salary_range[1]}`,
    );

    if (item.tags.length > 0) {
      explanation.push(`is suited for interests in ${item.tags.join(", ")}`);
    }

    res.json({
      item_id: item._id,
      title: item.title,
      explanation: `This item ${explanation.join(", ")}.`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
