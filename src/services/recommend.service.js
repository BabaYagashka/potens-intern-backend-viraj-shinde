export function calculateScore(profile, item) {
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
