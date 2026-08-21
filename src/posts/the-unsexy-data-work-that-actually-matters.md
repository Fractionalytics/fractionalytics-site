---
title: "The Unsexy Data Work That Actually Matters"
dek: "How we fixed 300K+ mismatches to unlock marketing automation. Cross-functional data cleanup requires leadership and teamwork."
date: 2025-10-21
origin: https://www.linkedin.com/pulse/unsexy-data-work-actually-matters-how-we-fixed-300k-mismatches-smith-gt1we/
tags: ["case study","data quality","CDP"]
---
The marketing team was excited. We'd just implemented Segment's Linked Audiences—a powerful no-code campaign creator that would let them build sophisticated customer segments from our Snowflake data warehouse and launch campaigns without waiting on engineering.

There was just one problem: we couldn't turn it on.

Why? Because our customer data was a mess. The marketing automation IDs stored in our production database didn't match the actual IDs in the marketing platform itself. Over 300,000 records were out of sync. Email addresses conflicted. User statuses didn't align. Some users existed in one system but not the other.

For years, the marketing automation platform had been treated as our source of truth for customer data—not an ideal use of its capabilities, but that's how it evolved. Now we were modernizing our stack with Snowflake as the new source of truth, and nobody had ever looked at these mismatches before.

If we turned on Linked Audiences with this dirty data, we'd send inappropriate messages to the wrong people—or worse, message churned customers who should never hear from us again.

This is the unglamorous reality of data work that nobody talks about: before you can use any fancy CDP or marketing automation feature, you have to clean your data. And that work is slow, painful, and cross-functional.

Here's how we did it—and what I learned along the way.

## The Problem: When Your "Source of Truth" Lies

We discovered the mismatch issue while implementing Segment CDP as part of our modern data stack strategy. The goal was simple: use Segment to collect customer events, feed them into Snowflake, use Segment's reverse ETL to sync with the marketing automation system, and enable marketing to create targeted campaigns through Linked Audiences without relying on engineering.

But when we started validating our data pipelines, we found a crisis hiding in plain sight.

The specific issues:

- Marketing automation IDs in our production database didn't match the actual IDs in the marketing platform
- Email addresses were sometimes out of sync between systems
- User status fields conflicted—someone marked as "active" in one system appeared as "churned" in another
- Hundreds of users existed in one system but appeared to be missing from the other

How did this happen?

The root cause was organizational, not technical. For years, the marketing automation platform had served as the de facto source of truth for customer data. This wasn't intentional—it just evolved that way. Marketing owned customer communications, so they naturally became the keepers of customer records.

But marketing automation platforms aren't designed to be systems of record. They're built for campaigns, lead scoring, and workflows—not master data management. Over time, as different teams made updates in different systems, the drift accelerated. Band-aid fixes compounded the problem. Multiple data sources fed different systems with no reconciliation process.

Nobody had ever audited these mismatches because nobody had needed to. Until now.

What was at stake

On the surface, we'd just wasted money on a Segment license we couldn't fully use. But the real cost was deeper: organizational paralysis.

Marketing couldn't trust the data to build campaigns. Every decision required manual spot-checks. Product teams couldn't rely on marketing data for customer analysis. The data team's credibility suffered—why should anyone trust our analytics if we couldn't even get customer IDs right?

Trust was eroding across teams. And without trust in data, you can't make data-driven decisions.

## The Approach: Why This Was an Organizational Problem, Not a Technical One

Fixing 300,000+ mismatches wasn't technically complicated. Write some SQL, match records, resolve conflicts, update databases. Any competent data engineer could figure out the mechanics.

The hard part was everything else.

Three teams needed to coordinate:

- **Data team (including me):** Identify mismatches, create visualizations, track progress, build the reconciliation pipeline, fix errors in Snowflake where appropriate
- **Marketing team:** Spot-check records, identify root causes, prioritize which mismatches mattered most, validate fixes
- **Product/Engineering team:** Fix source systems where issues originated, update records in production, prevent new mismatches from occurring

Each team had full-time day jobs. Nobody could drop everything for six months to clean data. This had to happen in parallel with regular work, which meant progress would be slow.

We needed a sustainable approach that would maintain momentum without burning anyone out.

Here's what we did...

### 1. Make the Problem Visible

I built a Venn diagram dashboard that updated weekly and showed:

- Records in the marketing automation platform (left circle)
- Records in the production app database (right circle)
- Records reconciled between the systems (overlap, in grey)
- Records in the production database but not found in the marketing platform ("Orange Zone")

[IMAGE: the Venn diagram at project start. Caption: At the outset of the cleanup project, a large percentage of customers did not have matching IDs in the marketing automation system. We called this the "Orange Zone," and our job was to shrink it.]

Our job was to reduce the "Orange Zone" as much as possible. The total mismatch count appeared at the top in large numbers. Every week, that number changed.

This visualization did something crucial: it turned an abstract problem ("our data quality is bad") into a concrete, measurable challenge ("our 'Orange Zone' has 215,432 mismatches, down from 223,117 last week").

Everyone could see whether we were making progress or spinning our wheels. The visibility created accountability.

### 2. Weekly Cross-Functional Meetings

Every Wednesday, 2:30 pm ET, 30 minutes. No exceptions.

The agenda was simple:

- Review the Venn diagram (2 minutes)
- Discuss the biggest problems discovered that week (10 minutes)
- Prioritize cleanup tasks (10 minutes)
- Assign owners and track blockers (8 minutes)

We didn't try to fix everything at once. We identified the worst offenders—the mismatches that would cause the most damage if left unfixed—and tackled those first.

Some weeks we made huge progress. Other weeks we barely moved the needle because everyone was slammed with their regular work. That was okay. The meeting kept us honest and maintained momentum even when progress was slow.

### 3. Shared Ownership

This couldn't be "the data team's problem." If it was just my responsibility, it would never get prioritized against competing demands from marketing campaigns and product launches.

So we divided ownership:

- **Marketing owned spot-checking and root cause analysis.** When we flagged a batch of mismatches, they'd investigate: Was this a data entry error? A bug in how leads got created? A process that needed fixing?
- **Product/Engineering owned fixing source systems.** Many mismatches originated from bugs or process gaps in how the production app created or updated records. They had to fix those issues to prevent new mismatches.
- **Data team owned measurement and tracking.** Our team built the reconciliation pipeline, generated the weekly reports, and managed the overall project timeline.

Everyone had skin in the game. Everyone could see their contribution to progress.

### 4. Celebrate Small Wins

Data cleanup is demoralizing. You fix 10,000 records and there are still 290,000 to go. It feels endless.

So every week, we celebrated progress:

- "Last week: 215,432 mismatches"
- "This week: 208,117 mismatches"
- "Progress: 7,315 records cleaned ✅"

Seven thousand records out of 300,000+ doesn't sound like much. But over six months, those small wins added up.

The key was making progress visible and acknowledging the work people were putting in, even when the finish line still felt far away.

## The Result: What Six Months of Unglamorous Work Unlocked

After six months of sustained effort, we reached our threshold: mismatches reduced from over 300,000 to under 5,000—a level we deemed acceptable given the ongoing nature of data drift.

We turned on Segment Linked Audiences. Marketing could finally build sophisticated customer segments and launch campaigns without engineering bottlenecks. The tool we'd paid for months ago started delivering value.

But the real wins went deeper than enabling one feature:

**Marketing now trusted the data.** They'd been part of fixing it, so they understood its limitations and strengths. They knew which fields were clean and which still needed caution.

**Cross-functional collaboration improved.** Marketing, product, and data teams had worked together for six months on a shared goal. Relationships strengthened. Communication patterns improved. When new issues arose, we had established ways of working together.

**Organizational trust in data increased.** Everyone saw the before and after. They watched the mismatch count drop week by week. Data quality became a shared concern, not just the data team's responsibility.

**We built a culture of data ownership.** Marketing now thinks about data quality when they set up campaigns. Product considers downstream impacts when changing schemas. Everyone feels invested in keeping data clean because they helped fix it.

**We set the foundation for AI and advanced analytics.** This is the part nobody talks about: you can't do AI on dirty data. Every company wants to "adopt AI" for personalization, recommendations, and predictions. But AI doesn't work when customer IDs don't match and email addresses conflict across systems.

The boring work of data cleanup is what makes AI-ready infrastructure possible.

## Lessons Learned: What This Project Taught Me About Data Leadership

### 1. The Unsexy Work Is Often the Most Valuable

Nobody celebrates data cleanup projects. There's no trophy for "Fixed 300,000 ID Mismatches." It doesn't make a great conference talk.

But this work unlocked millions of dollars of marketing efficiency. It enabled tools we'd already paid for. It restored trust across teams. It laid the groundwork for future AI initiatives.

If you're a data leader, don't skip the boring stuff. Clean data is the foundation for everything else. All the fancy machine learning models and AI-powered personalization in the world won't work if your customer IDs don't match.

### 2. Cross-Functional Coordination Is Harder Than Technical Work

The technical solution was straightforward: write SQL to match records, identify conflicts, resolve discrepancies, update databases.

The organizational challenge was the real work:

- Getting busy people to prioritize data cleanup alongside their day jobs
- Maintaining momentum over six months when results felt slow
- Keeping three teams aligned when everyone had competing priorities
- Building consensus on which issues to tackle first
- Celebrating progress when the finish line kept moving

Data leadership isn't just technical—it's organizational. The best CDOs I know spend more time on alignment, communication, and culture than on SQL queries.

### 3. Make Progress Visible

The Venn diagram dashboard was our secret weapon.

[IMAGE: the Venn diagram later in the project. Caption: After some time, the "Orange Zone" of mismatched customers reduced in size]

It transformed a problem that felt overwhelming and abstract into something concrete and measurable: the "Orange Zone." Everyone could see the same numbers. Everyone could track progress (or lack of it). There was no room for ambiguity about whether we were succeeding.

Visibility creates accountability. When progress is invisible, it's easy for everyone to assume someone else is handling it. When progress is visible every week, everyone stays engaged.

This applies beyond data cleanup. Whatever hard problem you're tackling, find a way to make progress visible to all stakeholders.

### 4. Celebrate the Team, Not the Tool

Yes, Segment Linked Audiences is a powerful product. But the real win wasn't enabling one feature.

The real win was:

- Marketing trusts data now
- Product thinks about data quality proactively
- Everyone owns data quality together
- We built cross-functional relationships that make future projects easier

Culture change matters more than tool adoption. Tools come and go. Organizational trust and collaboration patterns last.

### 5. You Can't Skip to AI

Every company wants to use AI for personalization, recommendations, and customer predictions. Every executive asks "How can we leverage AI?"

But AI doesn't work on dirty data.

Before you chase the shiny new thing, do the unsexy work first:

- Identity resolution across systems
- Data validation and cleanup
- Source system alignment
- Governance processes to prevent future drift

This is what "AI-ready infrastructure" actually looks like. It's about having clean, trustworthy data with proper lineage and governance. The companies that succeed with AI aren't the ones who move fastest. They're the ones who do the foundational work that makes AI actually work.

## The Work That Nobody Sees

Data leaders face a constant tension: leadership wants innovation and cutting-edge capabilities. They want AI, advanced analytics, predictive models, real-time personalization.

But none of that works without the boring stuff. Clean data. Proper governance. Cross-functional alignment. Trust.

The hardest part of being a data leader is explaining why we need to spend six months fixing ID mismatches before we can do the exciting work. It's not a sexy pitch. But it's the work that actually matters.

If you're facing a similar challenge—dirty data blocking your marketing automation, analytics, or AI initiatives—here's my advice:

**Start small.** You don't need to fix everything at once. Pick the worst mismatches and chip away at them week by week.

**Make it visible.** Build a dashboard that shows progress. Update it regularly. Make sure all stakeholders can see the same numbers.

**Share the ownership.** This can't be just the data team's problem. Get marketing, product, and engineering invested in the solution. Everyone needs skin in the game.

**Celebrate progress.** Even small wins matter when the project takes months. Acknowledge the work people are putting in.

And most importantly: **Don't skip this work.** The unsexy data cleanup is what makes the sexy AI tools actually work.

*Note: This article describes a real project at an B2C SaaS client. Details have been anonymized to protect client confidentiality, but the lessons and approaches are presented accurately.*

*If your company is wrestling with data quality challenges or struggling to get value from tools you've already bought, I'd love to talk. I specialize in the foundational work that makes modern data stacks and AI initiatives successful. Whether you need fractional leadership or are building a full-time data team, let's connect.*

*david@fractionalytics.io*
