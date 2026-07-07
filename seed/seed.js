import mongoose from "mongoose";
import dotenv from "dotenv";
import Item from "../src/models/item.model.js";

dotenv.config();

const baseWeights = {
  skills: 0.4,
  experience: 0.2,
  location: 0.1,
  salary: 0.2,
  interest: 0.1,
};

const items = [
  {
    title: "Backend Intern",
    required_skills: ["nodejs", "express"],
    min_experience: 0,
    location: "remote",
    salary_range: [300000, 500000],
    tags: ["backend", "api"],
    weights: baseWeights,
  },
  {
    title: "Full Stack Developer",
    required_skills: ["nodejs", "react"],
    min_experience: 1,
    location: "remote",
    salary_range: [400000, 800000],
    tags: ["frontend", "backend"],
    weights: baseWeights,
  },
  {
    title: "Data Analyst Intern",
    required_skills: ["python", "sql"],
    min_experience: 0,
    location: "onsite",
    salary_range: [200000, 400000],
    tags: ["data"],
    weights: baseWeights,
  },
  {
    title: "Backend Engineer",
    required_skills: ["nodejs", "mongodb"],
    min_experience: 1,
    location: "remote",
    salary_range: [500000, 900000],
    tags: ["backend"],
    weights: baseWeights,
  },
  {
    title: "Frontend Intern",
    required_skills: ["react", "javascript"],
    min_experience: 0,
    location: "remote",
    salary_range: [200000, 400000],
    tags: ["frontend"],
    weights: baseWeights,
  },
  {
    title: "DevOps Intern",
    required_skills: ["docker", "linux"],
    min_experience: 0,
    location: "remote",
    salary_range: [300000, 500000],
    tags: ["devops"],
    weights: baseWeights,
  },
  {
    title: "Machine Learning Intern",
    required_skills: ["python", "ml"],
    min_experience: 1,
    location: "remote",
    salary_range: [400000, 700000],
    tags: ["ai"],
    weights: baseWeights,
  },
  {
    title: "Android Developer Intern",
    required_skills: ["kotlin", "android"],
    min_experience: 0,
    location: "onsite",
    salary_range: [250000, 450000],
    tags: ["mobile"],
    weights: baseWeights,
  },
  {
    title: "iOS Developer Intern",
    required_skills: ["swift", "ios"],
    min_experience: 0,
    location: "remote",
    salary_range: [300000, 500000],
    tags: ["mobile"],
    weights: baseWeights,
  },
  {
    title: "QA Engineer Intern",
    required_skills: ["testing", "selenium"],
    min_experience: 0,
    location: "onsite",
    salary_range: [200000, 350000],
    tags: ["qa"],
    weights: baseWeights,
  },
  {
    title: "Cloud Engineer",
    required_skills: ["aws", "docker"],
    min_experience: 2,
    location: "remote",
    salary_range: [700000, 1200000],
    tags: ["cloud"],
    weights: baseWeights,
  },
  {
    title: "UI/UX Designer",
    required_skills: ["figma", "design"],
    min_experience: 0,
    location: "remote",
    salary_range: [300000, 600000],
    tags: ["design"],
    weights: baseWeights,
  },
  {
    title: "Cybersecurity Analyst",
    required_skills: ["security", "networking"],
    min_experience: 1,
    location: "onsite",
    salary_range: [500000, 900000],
    tags: ["security"],
    weights: baseWeights,
  },
  {
    title: "Game Developer Intern",
    required_skills: ["unity", "csharp"],
    min_experience: 0,
    location: "remote",
    salary_range: [300000, 500000],
    tags: ["game"],
    weights: baseWeights,
  },
  {
    title: "Blockchain Developer",
    required_skills: ["solidity", "web3"],
    min_experience: 1,
    location: "remote",
    salary_range: [600000, 1000000],
    tags: ["blockchain"],
    weights: baseWeights,
  },
];

async function seedDB() {
  await mongoose.connect(process.env.MONGO_URI);

  await Item.deleteMany();
  await Item.insertMany(items);

  console.log(`Seed data inserted: ${items.length} items`);
  process.exit();
}

seedDB();
