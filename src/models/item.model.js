import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    required_skills: { type: [String], default: [] },
    min_experience: { type: Number, default: 0 },
    location: { type: String, default: "remote" },
    salary_range: { type: [Number], default: [0, 0] },
    tags: { type: [String], default: [] },

    weights: {
      skills: { type: Number, default: 0.4 },
      experience: { type: Number, default: 0.2 },
      location: { type: Number, default: 0.1 },
      salary: { type: Number, default: 0.2 },
      interest: { type: Number, default: 0.1 },
    },
  },
  { timestamps: true },
);

export default mongoose.model("Item", itemSchema);
