export function calculateScore(profile, item) {
  profile = {
    skills: [],
    interests: [],
    experience: 0,
    location: "",
    expected_salary: 0,
    ...profile,
  };

  let score = 0;

  // Skill match
  const skillMatch =
    item.required_skills.length === 0
      ? 1
      : profile.skills.filter((s) => item.required_skills.includes(s)).length /
        item.required_skills.length;

  // Experience
  const expMatch = profile.experience >= item.min_experience ? 1 : 0;

  // Location
  const locMatch = profile.location === item.location ? 1 : 0;

  // Salary
  const salMatch =
    profile.expected_salary >= item.salary_range[0] &&
    profile.expected_salary <= item.salary_range[1]
      ? 1
      : 0;

  // Interest
  const interestMatch = profile.interests.some((i) => item.tags.includes(i))
    ? 1
    : 0;

  score =
    skillMatch * item.weights.skills +
    expMatch * item.weights.experience +
    locMatch * item.weights.location +
    salMatch * item.weights.salary +
    interestMatch * item.weights.interest;

  return score;
}

// NEW: hard eligibility gate, run BEFORE calculateScore.
// An item only gets scored/ranked if the profile clears all three of
// these — no amount of skill/location/interest overlap can make up for
// being under-experienced, having zero relevant skills, or being outside
// the pay range.
export function isEligible(profile, item) {
  profile = {
    skills: [],
    experience: 0,
    expected_salary: 0,
    ...profile,
  };

  // Gate 1: experience must meet the minimum (boundary: equal passes)
  if (profile.experience < item.min_experience) return false;

  // Gate 2: must overlap on at least one required skill, if the item has any
  if (item.required_skills.length > 0) {
    const hasSkillOverlap = profile.skills.some((s) =>
      item.required_skills.includes(s),
    );
    if (!hasSkillOverlap) return false;
  }

  // Gate 3: expected salary must fall within the item's range (boundary: equal passes)
  if (
    profile.expected_salary < item.salary_range[0] ||
    profile.expected_salary > item.salary_range[1]
  ) {
    return false;
  }

  return true;
}
