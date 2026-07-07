import mongoose from "mongoose";
import dotenv from "dotenv";
import Item from "../src/models/item.model.js";

dotenv.config();

const items = [
  {
    title: "Backend Intern",
    required_skills: ["nodejs", "express"],
    min_experience: 0,
    location: "remote",
    salary_range: [300000, 500000],
    tags: ["backend", "api"],
    weights: {
      skills: 0.4,
      experience: 0.2,
      location: 0.1,
      salary: 0.2,
      interest: 0.1,
    },
  },
  {
    title: "Full Stack Developer",
    required_skills: ["nodejs", "react"],
    min_experience: 1,
    location: "remote",
    salary_range: [400000, 800000],
    tags: ["frontend", "backend"],
    weights: {
      skills: 0.4,
      experience: 0.2,
      location: 0.1,
      salary: 0.2,
      interest: 0.1,
    },
  },
  {
    title: "Data Analyst Intern",
    required_skills: ["python", "sql"],
    min_experience: 0,
    location: "onsite",
    salary_range: [200000, 400000],
    tags: ["data"],
    weights: {
      skills: 0.4,
      experience: 0.2,
      location: 0.1,
      salary: 0.2,
      interest: 0.1,
    },
  },
  {
    title: "Backend Engineer",
    required_skills: ["nodejs", "mongodb"],
    min_experience: 1,
    location: "remote",
    salary_range: [500000, 900000],
    tags: ["backend"],
    weights: {
      skills: 0.4,
      experience: 0.2,
      location: 0.1,
      salary: 0.2,
      interest: 0.1,
    },
  },
];

async function seedDB() {
  await mongoose.connect(process.env.MONGO_URI);

  await Item.deleteMany();
  await Item.insertMany(items);

  console.log("Seed data inserted");
  process.exit();
}

seedDB();
