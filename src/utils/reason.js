export function generateReason(profile, item) {
  const reasons = [];

  if (profile.skills.some((s) => item.required_skills.includes(s))) {
    reasons.push("matches your technical skills");
  }

  if (profile.experience >= item.min_experience) {
    reasons.push("fits your experience level");
  }

  if (profile.interests.some((i) => item.tags.includes(i))) {
    reasons.push("aligns with your interests");
  }

  if (
    profile.expected_salary >= item.salary_range[0] &&
    profile.expected_salary <= item.salary_range[1]
  ) {
    reasons.push("matches your salary expectations");
  }

  return `This item is recommended because it ${reasons.join(", ")}.`;
}
