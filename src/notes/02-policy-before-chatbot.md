---
title: A policy bot is only as good as the policy behind it
date: "2026-10-13"
tags:
  - hr-service
  - ai-in-hr
keywords:
  - knowledge management
summary: Reliable AI answers in HR depend on owned, current policy knowledge and an assistant that knows when to stop.
merged_from:
  - 3
  - 7
legacy_id: knowledge-layer
original_ids:
  - knowledge-layer
  - grounded-answers
related:
  - service-metrics
  - journey-owner
  - bounded-agents
  - vendor-evidence
date_source: No date field in the source JSON for notes 1-30; date is their first publication on the live site (commit 7af481e, 2026-10-13).
wording: kreus
---

*Reliable HR answers start with knowledge someone owns.*

A manager asks a simple question about leave. The answer depends on the country, the employee group and which version of the policy the assistant finds. The technology can respond perfectly to the wrong document.

Treat knowledge quality as part of service delivery, with an owner and ongoing capacity. HR needs to know which source is current, where local exceptions apply and who can approve a correction. A better interface won't fix contradictory guidance.

A trustworthy answer names the approved document, its effective date and the population it covers. A link helps, but the answer must actually reflect the source. When essential context is missing, the assistant should ask a follow-up question. It shouldn't guess an employee's location, contract status or eligibility.

**Where I'd start:** take the twenty questions the service team gets most often. Agree a short approved answer for each, with applicability, source policy, owner and review date, and make it easy for agents to flag an answer that no longer works. Then test the assistant on outdated guidance, contradictory documents and questions with no approved answer. Does it know when to stop? Repeat the tests whenever the policy or the model changes.

**The test:** more articles don't mean better support. After a policy change, check that the right answer reaches every channel.

*Sources: [Consortium for Service Innovation · KCS v6 Practices Guide](https://library.serviceinnovation.org/KCS/KCS_v6/KCS_v6_Practices_Guide); [NIST · Generative AI Profile, AI 600-1](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence)*
