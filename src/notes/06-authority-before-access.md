---
title: Authority before access
date: "2026-10-13"
tags:
  - ai-in-hr
keywords:
  - governance
  - AI agents
  - accountability
summary: Define what an HR agent may change before it gets access, and make sure a human reviewer can actually say no.
merged_from:
  - 8
  - 26
legacy_id: bounded-agents
original_ids:
  - bounded-agents
  - human-accountability
related:
  - vendor-evidence
  - grounded-answers
  - algorithmic-management
  - candidate-transparency
  - torvalds-ai-expertise
date_source: No date field in the source JSON for notes 1-30; date is their first publication on the live site (commit 7af481e, 2026-10-13).
wording: kreus
---

*Automation needs defined permissions. Oversight needs a reviewer who can actually say no.*

Drafting a letter and changing an employee record can look like the same instruction in a chat window. Operationally, they carry very different consequences.

Define an agent by its permitted tasks and controls, not as a "digital colleague" with implied boundaries. Reading, proposing and committing a transaction need different permissions. The business owner should be able to explain the difference without pointing everyone to a technical spec.

Oversight has the same problem. A workflow can include an approval step and still leave nobody in a position to challenge the recommendation: the reviewer is busy, the rationale is unclear and the process rewards fast acceptance. For an important people decision, I want a named decision-maker who can inspect the evidence, ask questions and pause the process without being treated as an obstacle.

**Where I'd start:** for a leave-administration use case, list what the agent may read, what it may draft and which actions need approval. Clarify who recommends, decides, pauses and handles a challenge. Test with synthetic cases, including one with a plausible error, and check whether the reviewer catches it and gets it fixed. Log the requested change, the decision and the system result, with a manual fallback.

**The test:** the reviewer must see the actual change, not a reassuring summary from the same assistant. Some uses should be narrowed or rejected. An approval step doesn't make them acceptable.

*Source: [NIST · AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) (voluntary guidance, not a legal safe harbor)*
