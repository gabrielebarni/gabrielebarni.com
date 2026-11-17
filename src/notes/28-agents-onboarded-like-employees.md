---
title: AI agents are getting onboarded like employees
date: "2026-11-17"
tags:
  - future-of-work
  - ai-in-hr
  - governance-and-value
keywords:
  - AI agents
  - governance
  - onboarding
  - accountability
summary: Tech companies are giving AI agents identities, written procedures and audit trails. That's HR's playbook for people, so HR belongs in the room when agents are deployed.
legacy_id: agents-onboarded-like-employees
original_ids:
  - agents-onboarded-like-employees
related:
  - bounded-agents
  - onboarding
  - algorithmic-management
  - time-dividend
wording: kreus
---

*Identity, written procedures, audit trails. Tech is rebuilding HR's playbook, this time for software.*

Two product announcements this month caught my attention. Neither mentioned HR, but both describe work HR has done for people for decades.

On November 16, AWS added new governance features to [Amazon WorkSpaces for AI agents](https://aws.amazon.com/about-aws/whats-new/2026/11/amazon-workspaces-AI-agents-connect-govern/). Agents can now sign in through the company's own identity provider. They can work "on behalf of" a signed-in user, with that person's permissions and policies. And there's session replay: a video of what the agent did, paired with a plain-language transcript, stored in the customer's own storage. AWS says the goal is to give you "the same oversight over an agent that you have over the employees you manage."

A week earlier, Salesforce made [AI Skills in Agentforce Coworker](https://www.salesforce.com/blog/ai-skills-in-coworker/) generally available. You describe a team's best practice once, in plain language, and an agent runs it the same way every time. Their own line: "Get your team's know-how out of one person's head." Their advice for getting started is to write down the steps "the way you'd explain them to a new hire."

Read them side by side and a pattern shows up. Tech companies are quietly rebuilding HR processes, for software.

## The same playbook, new workers

Look at what the announcements actually cover.

**Identity and access.** Before an agent touches real systems, it needs an identity, a defined set of permissions and someone accountable for it. For people we call that onboarding and provisioning: who you are, what you can open, who you report to, and what happens to your access when your role changes.

**Written procedures.** A skill is a job description and a standard operating procedure in one. It says when to use it, what steps to follow and what good output looks like. Getting know-how out of one person's head is knowledge transfer, the thing every good succession plan tries to do.

**Records of conduct.** Session replay is an audit trail: what the agent saw, what it did and whether it stayed within its limits. For people, the equivalent sits across performance records, compliance training and, when something goes wrong, an investigation.

**Guardrails.** In the Salesforce case, a skill runs with the permissions of the person using it and pauses for approval before it changes a record. That's delegation of authority, the oldest control in any organization.

None of this is new. It's how we've always made it safe for someone to do real work in a company. What's new is who the someone is.

## Why this is an HR conversation

I started in IT, and anyone who has run a Unix-like system knows the basics: every process runs as some user, with some permissions, and the logs tell you what happened. That's the right engineering instinct, and IT should own the technical side.

But the questions that decide whether agents work well in a company aren't only technical. They're organizational:

- Which tasks should an agent own, and which should stay with a person?
- Who is accountable when an agent acts on someone's behalf?
- Whose know-how gets written down as a skill, and how do we recognize the people who wrote it?
- Who reviews the record when something looks off, and what counts as acceptable behavior?
- How does a team's way of working change when part of the team is software?

HR has answered versions of these questions for people for a long time: role design, delegation, accountability, knowledge transfer, performance and conduct. Those are our processes. If agents are being onboarded like employees, HR should help design how that works, not find out about it after the rollout.

## What I'd do now

**Get in the room early.** When a company moves agents from pilot to production, HR should be part of the governance group next to IT, security and legal. Not to slow it down, but to bring the organizational questions while they're still cheap to answer.

**Treat skills as a knowledge asset.** The best practices that get written down for agents are often the expertise of your strongest people. Recognize them, and use the same material to onboard new colleagues faster. A procedure clear enough for an agent is usually clear enough for a new hire.

**Map roles, not just tools.** For each team, be explicit about what the agent does, what the person does and where the handover sits. Job descriptions should reflect that.

**Keep accountability human.** An agent can act on someone's behalf. It can't be accountable. Every agent in production should have a named owner, the same way every system has one.

## The geeky upside

What I like about this moment is that it forces clarity. To brief an agent well, you have to say what the work really is, what good looks like and where the limits are. Many organizations have never written that down for their people either.

If we do it well, agents get better instructions, and people get clearer roles, better onboarding and recognition for what they know. That's a future of work worth designing, and HR should be helping to design it.
