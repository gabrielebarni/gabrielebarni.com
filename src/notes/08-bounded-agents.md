---
title: "What is this HR agent allowed to change?"
date: 2026-10-13
tags: ["ai-in-hr"]
summary: "An automation needs clear authority before it receives access."
legacy_id: "bounded-agents"
legacy_number: 8
related: ["human-accountability", "vendor-evidence", "grounded-answers"]
wording: original
---

There is a significant difference between drafting a letter and changing an employee record. Both may look like a simple instruction in a chat interface. Operationally, they carry very different consequences.

## Define authority in operational terms

I would define an agent through its permitted tasks and controls, rather than describe it as a digital colleague and leave the boundaries implied. Reading, proposing and committing a transaction require different permissions. The business owner should be able to explain those differences without referring everyone to a technical specification.

## Agree the controls before the pilot

For a leave-administration use case, list what the agent may read, what it may draft and which actions need approval. Test with synthetic cases. Keep a record of the requested change, the decision and the system result, with a manual fallback.

The reviewer must see the actual change before approving it. A reassuring summary from the same assistant is insufficient.

<details>
<summary>Research behind this note</summary>

NIST's AI Risk Management Framework addresses risks through the design, development, use and evaluation of systems. It is a voluntary framework; local obligations need separate assessment.

Source: [NIST · AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) (2023 framework; revision underway)

</details>
