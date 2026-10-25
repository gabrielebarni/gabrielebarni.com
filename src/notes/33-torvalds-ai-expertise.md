---
title: "Linus Torvalds is using AI on the kernel. That changes the conversation."
date: 2026-10-13
tags: ["future-of-work"]
summary: "The Linux creator’s experiment with Claude Code is more interesting than a headline about faster coding. It shows both the opportunity and the work required to make it useful."
legacy_id: "torvalds-ai-expertise"
legacy_number: 33
featured: true
home_title: "Linus Torvalds, AI and the value of expertise."
related: ["junior-work-ai", "human-accountability", "value-scorecard", "future-hr-service-delivery"]
wording: original
---

Linus Torvalds is using Claude Code to help develop Linux kernel patches. For anyone who still associates AI assistance mainly with beginners, that is worth taking seriously. This is a highly experienced developer working on a demanding technical problem.

The experiment addresses a bottleneck in how the kernel handles simultaneous reads. The results are promising, but the engineering is unfinished. Both points matter: this is a serious use of AI, and it still requires the judgement and scrutiny that serious work demands.

## The problem: several cores competing over the same bookkeeping

Linux keeps file data in memory so it can be read without repeatedly returning to storage. In the workload Torvalds describes, several threads make small reads from the same cached file. Updating the shared reference counter becomes a source of contention.

The proposed change delays reuse of removed cache memory until an RCU grace period has passed. That allows a protected reader to copy the data without taking a folio reference. The trade-off is that memory can remain temporarily unavailable for reuse.

Source: [Linus Torvalds · Page-cache patch write-up (Linux repository mirror)](https://mirrors.hust.edu.cn/git/linux.git/commit/?id=4c0f3697118eb3a708ea79175f7f07c43339bfab) (10 October 2026 · commit 4c0f3697; experimental work)

## A substantial result, within a narrow test

On his i7-8565U laptop, the eight-thread, 16-byte-read test went from 2,937–2,975 kernel cycles per read to 725–726. Throughput rose from 9.9–10.4 million reads per second to 30–33 million. He cautions that thermal throttling makes cost per read the better comparison; mitigations and hardened usercopy were disabled.

Those are promising experimental results, not a claim that Linux as a whole is three times faster. The write-up also identifies unfinished work, including a memory-allocation regression. The experimental result should not be confused with an improvement already delivered to users.

Source: [Linus Torvalds · Page-cache patch write-up (Linux repository mirror)](https://mirrors.hust.edu.cn/git/linux.git/commit/?id=4c0f3697118eb3a708ea79175f7f07c43339bfab) (10 October 2026 · commit 4c0f3697; experimental work)

## What AI contributed—and what the figures do not tell us

Torvalds credits Claude Code with code, tests, review assistance and the explanatory draft, under his direction. That is a broader role than suggesting the next line of code.

It is also important to separate the performance of the software from the productivity of the developer. A faster read operation does not tell us how much engineering time was saved. We do not have a controlled comparison of Torvalds doing this work with and without AI.

The opportunity is that an experienced person may be able to investigate more options, prepare more supporting material or attempt work they would otherwise defer. Whether that becomes a net gain depends on the checking and correction required.

## The tool is moving further into the work

Claude Code’s documentation describes a tool that can read a codebase, edit files and run commands. The interaction can therefore extend beyond a chat response into a cycle of implementation and testing.

Source: [Anthropic · Claude Code overview](https://code.claude.com/docs/en/overview) (Product documentation · accessed 13 October 2026)

That is the evolution I find significant. We are increasingly discussing what a tool can do within a workflow, rather than only what it can say. The practical questions become more operational: which actions are allowed, what evidence is required and who approves the result?

There is no reason to assume that greater autonomy is always better. The appropriate level depends on the task, the consequences of failure and the quality of the controls. A useful assistant should help the expert work, without making responsibility harder to see.

## Expertise gives the assistance direction

Torvalds’s example challenges the idea that using AI is an admission of weak capability. A highly skilled developer can choose assistance precisely because they understand the problem well enough to direct and question it.

That does not make expertise a guarantee of productivity. It does explain why replacing the expert is the wrong starting assumption. Someone still needs to choose the problem, define what must remain true and judge whether the evidence supports the change.

### Set the problem

Identify the constraint worth addressing and the result that would matter. Generating more work is easy to confuse with making progress.

### Define the limits

Make requirements and unacceptable failure modes explicit before the tool starts changing things.

### Examine the result

Check the comparison, the tests and the conditions they leave out. A strong result in one setting does not settle every use case.

### Take the decision

Accept, revise or reject the work, with someone accountable for the consequences after it reaches users.

## The HR implication: include the experienced people

I would not limit AI development programmes to people who need help with basic tasks. Experienced colleagues should have the opportunity to test where the tools improve their work. They can help define realistic use cases and distinguish a convincing demonstration from a reliable service.

At the same time, avoid an expectation that everyone must use AI on everything. Ask for an informed choice and evidence of value. A team may gain speed, improve quality or explore more alternatives. It may also create additional review work elsewhere.

For an expert-led pilot, measure the complete effort through to acceptance: preparation, generation, review, testing, corrections and maintenance. Keep quality and incidents beside the output measure. Decide what the released capacity is intended to achieve.

The implications for junior colleagues are different. They are still building the judgement experienced people bring to the tool. The organisation needs to support that learning while improving today’s delivery.

## A more useful productivity discussion

What matters here is not that a prominent developer has endorsed a product. It is that AI assistance is being used in demanding work, with the result exposed to technical scrutiny rather than accepted on appearance.

For business leaders, that is a constructive position: give capable people good tools, make the boundaries clear and look closely at the outcome. Be ambitious about the opportunity, and specific about the evidence.

The next question is where this combination could improve our own work—and how we would know.

## Sources and context

The Punto Informatico report prompted this article. The technical account is based on Torvalds’s repository write-up, read through a Linux source mirror. The workplace and HR implications are my interpretation.

Source: [Punto Informatico · Linus Torvalds usa Claude Code per ottimizzare Linux, la svolta](https://www.punto-informatico.it/linus-torvalds-usa-claude-code-ottimizzare-linux-svolta/) (Tiziana Foglio · 13 October 2026 · reporting that prompted this note)

<details>
<summary>Research context and limitations</summary>

In his 10 October 2026 patch write-up, Torvalds credits Claude Code with code, test programs, review assistance and the initial explanatory draft, under his direction. He ran the measurements on his own machine. The proposal targets contention when multiple threads make small reads from the same cached file.

Source: [Linus Torvalds · Page-cache patch write-up (Linux repository mirror)](https://mirrors.hust.edu.cn/git/linux.git/commit/?id=4c0f3697118eb3a708ea79175f7f07c43339bfab) (10 October 2026 · commit 4c0f3697; experimental work)

</details>
