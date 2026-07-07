import { calculateScore } from "../src/services/recommend.service.js";

test("valid profile should return score > 0", () => {
  const profile = {
    skills: ["nodejs"],
    experience: 1,
    location: "remote",
    expected_salary: 400000,
    interests: ["backend"],
  };

  const item = {
    required_skills: ["nodejs"],
    min_experience: 0,
    location: "remote",
    salary_range: [300000, 500000],
    tags: ["backend"],
    weights: {
      skills: 0.4,
      experience: 0.2,
      location: 0.1,
      salary: 0.2,
      interest: 0.1,
    },
  };

  const score = calculateScore(profile, item);

  expect(score).toBeGreaterThan(0);
});

test("missing skills should not crash", () => {
  const profile = {
    experience: 1,
    location: "remote",
    expected_salary: 400000,
    interests: [],
  };

  const item = {
    required_skills: ["nodejs"],
    min_experience: 0,
    location: "remote",
    salary_range: [300000, 500000],
    tags: [],
    weights: {
      skills: 0.4,
      experience: 0.2,
      location: 0.1,
      salary: 0.2,
      interest: 0.1,
    },
  };

  expect(() => calculateScore(profile, item)).not.toThrow();
});

test("completely mismatched profile should have low score", () => {
  const profile = {
    skills: ["java"],
    experience: 5,
    location: "onsite",
    expected_salary: 1000000,
    interests: ["ml"],
  };

  const item = {
    required_skills: ["nodejs"],
    min_experience: 0,
    location: "remote",
    salary_range: [300000, 500000],
    tags: ["backend"],
    weights: {
      skills: 0.4,
      experience: 0.2,
      location: 0.1,
      salary: 0.2,
      interest: 0.1,
    },
  };

  const score = calculateScore(profile, item);

  expect(score).toBeLessThan(0.5);
});

test("salary boundary should match", () => {
  const profile = {
    skills: ["nodejs"],
    experience: 1,
    location: "remote",
    expected_salary: 300000,
    interests: ["backend"],
  };

  const item = {
    required_skills: ["nodejs"],
    min_experience: 0,
    location: "remote",
    salary_range: [300000, 500000],
    tags: ["backend"],
    weights: {
      skills: 0.4,
      experience: 0.2,
      location: 0.1,
      salary: 0.2,
      interest: 0.1,
    },
  };

  const score = calculateScore(profile, item);

  expect(score).toBeGreaterThan(0.5);
});

test("empty skills should still compute score", () => {
  const profile = {
    skills: [],
    experience: 1,
    location: "remote",
    expected_salary: 400000,
    interests: ["backend"],
  };

  const item = {
    required_skills: [],
    min_experience: 0,
    location: "remote",
    salary_range: [300000, 500000],
    tags: ["backend"],
    weights: {
      skills: 0.4,
      experience: 0.2,
      location: 0.1,
      salary: 0.2,
      interest: 0.1,
    },
  };

  const score = calculateScore(profile, item);

  expect(score).toBeGreaterThan(0);
});