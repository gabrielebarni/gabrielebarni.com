---
title: Open weights are the new Linux
date: "2026-11-18"
tags:
  - future-of-work
  - governance-and-value
keywords:
  - open-weight models
  - AI sovereignty
  - vendor lock-in
  - AI governance
summary: Open-weight AI models give companies what Linux once gave them, control over where the work runs, what it sees and how it changes. That makes AI an organizational decision, not just a vendor choice.
legacy_id: open-weights-new-linux
original_ids:
  - open-weights-new-linux
related:
  - agents-onboarded-like-employees
  - vendor-evidence
wording: kreus
---

*Linux didn't win the server room by being better on day one. It won by giving companies control. Open-weight AI is following the same path.*

## The hook

This week Meituan, the Chinese food delivery company, [released the weights for LongCat-2.5](https://the-decoder.com/meituan-releases-a-1-6-trillion-parameter-agent-model-that-never-touched-an-nvidia-gpu/), a 1.6-trillion-parameter model built for agents that work through long, multi-step tasks. According to The Decoder, Meituan's own benchmarks put it close to top closed models on several agent tests, and it was trained entirely on Chinese hardware.

The part that matters for companies is the license. It's MIT, which allows commercial use, modification and redistribution. You can download it, run it, change it and build on it.

## Why open beats closed, again

Let me tell you an old story that not many people still remember.

In 1983 Richard Stallman, a programmer at MIT's AI Lab, announced the GNU project: a complete Unix-like operating system that anyone could use, study, change and share. His frustration was practical. Software that used to be passed around freely was being locked behind licences and non-disclosure agreements, so users could no longer fix what they depended on. He founded the Free Software Foundation in 1985 and wrote the GNU General Public License, which turned that idea into law: you're free to use and change the code, and you have to pass the same freedom on. I read a lot of Stallman as a teenager, and that idea stuck.

By the early 1990s GNU had almost everything except a kernel. In 1991 Linus Torvalds, a student in Helsinki, released Linux, soon put under the GPL, and the pieces came together as GNU/Linux. It wasn't the most polished system for years, and proprietary Unix from big vendors was the safe choice. But it was the one you could inspect, modify and run wherever you wanted, and that's why it ended up in so many server rooms. The licence did as much work as the code.

LongCat's MIT licence plays a similar role today. It isn't the GPL, but it gives companies the same thing that mattered then: control. In practice, that means:

- **Data and location.** You decide where the model runs: your own servers, your own cloud region or your own country. Sensitive data, like HR records, doesn't have to leave your environment.
- **Sovereignty.** For European companies, being able to run AI on infrastructure you choose, under rules you understand, isn't a nice-to-have. It's a strategic position.
- **No lock-in.** If a vendor changes prices, terms or the model itself, you aren't stuck. You keep the version that works.
- **Auditability.** You can test the model, keep a fixed version for regulated processes and show what changed and when.
- **Cost.** Once you've built the setup, you pay for compute, not per seat or per token at someone else's price.
- **Tuning.** You can adapt the model to your own work, language and knowledge, which is where most of the value is.

## The honest caveats

Open doesn't mean easy. Meituan's self-hosting guide [describes a cluster of 194 Huawei Ascend accelerators](https://the-decoder.com/meituan-releases-a-1-6-trillion-parameter-agent-model-that-never-touched-an-nvidia-gpu/). Most companies won't run a model that size. In practice, the useful move is usually a smaller open model, well tuned, for a well-defined job.

Open also doesn't mean neutral. You still need to know where a model comes from, how it was trained and what it does with your data. Linux needed sysadmins. Open models need people who know how to evaluate, secure and run them.

## Who owns the decision

This is where it becomes a Future of Work question. Choosing a closed AI tool can look like a procurement decision. Choosing to run your own model is an operating-model decision. Someone has to own which models are allowed, what they're tuned on, who checks their output and who answers when they get something wrong.

That can't sit with IT alone. The knowledge you tune a model on is your people's know-how. The work it changes is their work. HR, legal, risk and the business should decide together, with IT owning the technical side.

Linux taught companies that control is worth more than polish. With AI, control also means being clear about who decides.
