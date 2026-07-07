# Potens Internship Assignment — Q2: Profile-to-Recommendation API

**Candidate:** Viraj Shinde
**Domain chosen:** Internship / entry-level job matching — a user submits a candidate profile and gets back the top 3 roles from a catalogue that best 
fit them, with a plain-English reason for each.

## Tech stack
Node.js (ES Modules) · Express · MongoDB · Mongoose · Jest

## Why this domain
Picked internship matching because I'm going through this search myself
right now, so the fields (skills, experience, location, salary band,
interests) and the catalogue (Backend Intern, Full Stack Developer, Data
Analyst Intern, Backend Engineer, ...) map to real postings rather than
invented data.

## Project structure
```
src/
  config/          env/db setup
  models/          Item (Mongoose schema)
  controllers/      recommend, items (CRUD), explain
  routes/          recommend, items, explain
  services/        recommend.service.js — eligibility + scoring logic
  middleware/      auth.middleware.js — admin API key check
  utils/           reason.js — human-readable reason generator
seed/
  seed.js          loads the item catalogue into MongoDB
tests/
  recommend.test.js
```

## Data model (`Item`)
```js
{
  title: String,
  required_skills: [String],
  min_experience: Number,
  location: String,
  salary_range: [Number, Number],
  tags: [String],
  weights: { skills, experience, location, salary, interest }  // per-item weighting
}
```
Weights live on the item (not globally) so different roles can care more or
less about, say, exact location vs. skill overlap.

## Profile (request body for `/recommend`)
Five required attributes, matching the assignment's minimum:
```json
{
  "skills": ["nodejs", "mongodb"],
  "experience": 1,
  "location": "remote",
  "expected_salary": 400000,
  "interests": ["backend"]
}
```

## Matching logic

Matching happens in two distinct stages — a hard eligibility gate, then a
soft ranking score — rather than one blended calculation. This split
matters: it means the system can say "nothing in the catalogue actually
fits you" instead of always forcing out 3 results regardless of quality.

### Stage 1 — Eligibility (`isEligible`)
An item is only considered at all if the profile clears **all three**:
- **Experience** — `profile.experience >= item.min_experience` (equal passes)
- **Skill overlap** — at least one of the profile's skills is in the item's
  `required_skills` (skipped if the item requires none)
- **Salary fit** — `expected_salary` falls inside `salary_range`, inclusive
  at both ends

If no items pass, `/recommend` returns `recommendations: []` with a message
explaining why, rather than 3 low-quality matches.

### Stage 2 — Ranking (`calculateScore`)
Only items that passed Stage 1 get scored, using a weighted sum:

```
score = skillMatch   × weights.skills
      + expMatch      × weights.experience
      + locMatch      × weights.location
      + salMatch      × weights.salary
      + interestMatch × weights.interest
```

- `skillMatch` — fraction of the item's required skills the profile has
- `expMatch` / `salMatch` — same checks as the gate, now contributing to
  score rather than filtering (kept for tie-breaking/transparency)
- `locMatch` — 1 if locations match exactly, else 0
- `interestMatch` — 1 if any profile interest is in the item's tags

The top 3 by score are returned, each with a `reason` paragraph
(`generateReason`) naming the specific things that matched.

## Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/recommend` | none | top 3 *eligible* items, ranked, with a reason each |
| GET/POST/PUT/DELETE | `/api/items` , `/api/items/:id` | `x-api-key` header | full catalogue CRUD |
| GET | `/api/explain/:id` | none | plain-language eligibility/criteria for one item |

Admin routes check `x-api-key` against `ADMIN_API_KEY` in `.env`; missing or
wrong key returns `401`.

## Seed data
```bash
node seed/seed.js
```
Loads the item catalogue (with per-item weights) into MongoDB, wiping any
existing items first.

## Tests
```bash
npm test
```
Five Jest tests against the pure `calculateScore` function (no DB needed):
valid profile, missing fields (defensive — doesn't throw), a mismatched
profile scoring low, an exact-boundary salary match, and empty-skills as a
neutral case.

Verified manually end-to-end via Postman for the three key scenarios the
gate is meant to handle:
- **Should match** — profile fitting an existing item → non-empty ranked result
- **Should not match** — profile failing every eligibility criterion →
  empty `recommendations` + explanatory message
- **Boundary** — `expected_salary` exactly at an item's `salary_range` floor
  → still returned (confirms the inclusive boundary, catches off-by-one bugs)

## Setup
```bash
npm install
cp .env.example .env   # set MONGO_URI and ADMIN_API_KEY
node seed/seed.js
npm run dev
```

## Design decisions & known limitations
- **Gate vs. score split is deliberate.** Experience and salary are checked
  in both stages — once as a hard pass/fail, once contributing to the
  ranking score. This is intentional, not redundant: it means eligible
  items can still be differentiated (e.g. by skill-overlap ratio) once
  they've cleared the bar.
- **Location and interests remain soft-only.** A candidate isn't excluded
  for being in the wrong city or having no listed shared interest — those
  only affect ranking, on the assumption people are often flexible on
  location and interests are a "nice to have" signal, not a hard blocker.
  Skills, experience, and salary are treated as non-negotiable instead.
- No caching, webhook, or OpenAPI layer implemented (stretch goals) —
  prioritized getting the required pieces solid first.

## Future improvements
- Route-level (supertest) tests for the CRUD auth and `/explain` 404 case,
  and dedicated unit tests for `isEligible` itself, in addition to the
  current scoring tests.
- TTL cache on `/recommend`, a `/subscribe` webhook, and an auto-generated
  OpenAPI spec.

## AI use
Used ChatGPT for scaffolding discussion, debugging a defensive-coding test
failure, adding the eligibility gate, and structuring this README. All code
was written/adapted and tested by hand, not copy-pasted blind.
