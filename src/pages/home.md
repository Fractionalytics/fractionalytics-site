---
title: "AI strategy, the data beneath it, and the systems to run it"
eyebrow: "Past the pilot"
titleLines: ["Value creation with AI requires", "trusted data foundations"]
metaTitle: "Fractionalytics: AI strategy and the data foundation under it"
description: "Fractional CDO work for companies stuck past the pilot: AI strategy, the data foundation under it, and the systems to run it. David Smith, Coral Gables."
identity: "Fractionalytics is a fractional data and analytics consultancy that helps founder-led and private-equity-backed companies get their data trustworthy enough to build on, then automate the use cases that create value."
lede: "AI projects stall when the systems underneath the AI disagree about basic metric definitions. Where humans used to catch bad numbers before they reached a dashboard, AI systems act on whatever data they're given."
# COPY REWRITTEN BY DAVID 2026-09-22, by hand in the generated HTML, then synced back here the
# same day so a build reproduces it. His rewrite is the canon for this page; edit here, not in
# index.html. He added the quotation marks around the three hooks and reordered the cards
# (Diligence now second). The two anchors he set by hand are kept with {#...} on the headings.
#
# The three hooks are ONE REGISTER: the buyer's own voice, first person plural, which is why
# they are in quotation marks. A "we" here can only be read as the buyer, never as the
# practice. The hooks DIVERGE FROM THE BODY COPY ON PURPOSE and a consistency pass must not
# align them back.
#
# The shape lines are the other layer, describing the work rather than speaking as anyone.
offerings: [
  {
    "name": "Remediation",
    "href": "#remediation-when-something-is-already-broken",
    "hook": "\"Our customer count came back 1,600 in one system and 14,000 in another.\"",
    "shape": "A bounded look to discover the root cause and a plan for the fixes worth making."
  },
  {
    "name": "Diligence",
    "href": "#diligence-own-it",
    "hook": "\"What are we actually buying? How do we create value?\"",
    "shape": "A customer base audit, a data condition review, and an integration cost estimate."
  },
  {
    "name": "Fractional CDO",
    "href": "#fractional-cdo-section",
    "hook": "\"We want to be data-driven and AI-forward, and we are having trouble getting there.\"",
    "shape": "Align the people and tool stack with trust in the numbers and value delivery."
  }
]
---

Most companies are not stuck on AI. They are stuck underneath it.

They ran the pilot, bought the license, or built the agent, and it worked well enough to raise the ambition. Then the next step needed two systems to agree on something basic, and they did not. Nobody inside the building can say how far off the numbers are, or why, because the people who built the mess left and the logic lives in dashboards, spreadsheets and three people's heads.

The license gets paid every month whether or not anyone can switch it on, and the pilot that worked is sitting next to the one that cannot ship. Getting that spend to return something is most of what I get hired to do.

## What that looks like in practice

**A consumer software company had paid for a marketing platform it could not switch on.** Two upstream systems disagreed about who the customers were by more than 300,000 records. The license was being paid monthly and returning nothing. The tool was not the problem. It was the data feeding into it.

**At a payments company, finance and growth calculated profit per transaction differently**, millions apart on a single cost line. A new product showed a profit in one report and a loss in the other, and the leadership team could not fund it or kill it.

**A customer count came back 1,600 in one system and 14,000 in another.** The fix was three workflows, two reports and four filters. The analysis that had been blocked behind it ran the same week.

## Remediation, when something is already broken

**Part A. Find out what is actually wrong, and stop.** A short, bounded look that ends in a decision rather than a report: what is broken, which of those are costing you something now, and what each would take to fix. It is priced on its own, because you need the answer either way. If it turns out there is nothing much here, that is a good outcome and you are done.

**Part B. Fix the things worth fixing.** I own detection, matching, triage and measurement. Your team owns the source-system changes and the business calls about what a number should mean, because those are not mine to make. Weeks rather than months, and the measurement is agreed before the work starts so that "done" is not a matter of opinion.

**Part C. Keep it from happening again.** The reason this work has historically been thrown away is that nothing captured what was learned. Every definition settled, every rule agreed and every fix made becomes something the business owns and the next AI project stands on, rather than tribal knowledge that leaves when someone does.

## Diligence, whether you own it yet or not {#diligence-own-it}

Diligence, a thorough review of what condition the data is in and what the data says about the customer base, is best performed prior to investing. But it is also valuable to look at regularly after you own it to see what it says about the opportunities and risks in the business.

**A customer base audit.** Cohorts, concentration, retention, lifetime value, and payback rebuilt from the event logs or transaction records, with the segments carrying the thesis named. The value of your business is the sum of the value of your customers, the ones you have plus the ones you'll acquire.

**A data condition review.** Which reported numbers come from a system, and which get rebuilt in a spreadsheet every month. Manual processes pass diligence intact and then set the ceiling on the operating plan, because every initiative built on those numbers inherits the manual step.

**An integration cost estimate.** Every add-on is a data integration event and the target's definitions will not match yours. That cost is knowable before you close, and it is usually discovered in month four.

## Fractional CDO, when it is more than one thing {#fractional-cdo-section}

Sometimes it is not one broken thing. What I hear is a version of the same sentence: "We want to be data-driven and AI-forward, and we are having trouble getting there."

The answer is a combination of things, and which part is binding differs every time.

- Do you have the right people on the bus, and are they in the right seats?
- Does the business trust its data?
- Where are the quick wins?
- Is the tool stack getting in the way?
- What is the company spending on this team, and what is it getting back?

Trust is usually the central issue. Finance does not trust what marketing is saying and marketing does not trust what finance is saying, so they spend time arguing about the numbers rather than taking action to grow the business.

The tool stack that orchestrates the flow of data covers everything from how the data comes in to whether what comes out is trustworthy enough to point AI at. One company had Snowflake with a pile of views built on top and nothing managing any of it. We rebuilt that layer in dbt.

The last question is the one that rarely gets asked out loud. Some of what a data team returns is intangible, and that is fine, but the ROI equation is still real and it can be improved.

Data is a business discipline much more than it is a technical one.

## How you buy it

Three shapes. Which one fits is a question about the work, not about price.

| Shape | When it fits |
|---|---|
| **A block of hours** | Time and materials. Spot work, and problems nobody has scoped yet. |
| **A fixed-scope project** | A statement of work, with the measurement agreed before it starts. Right once Part A has told us what we are actually fixing. |
| **A fractional CDO basis** | When the problem is pervasive enough to need someone embedded with your team over an extended period, rather than a bounded piece handed back at the end. |

Which of the three it is depends on what we are trying to accomplish, and that is a conversation rather than a form.

I sell no software and take no vendor commissions, so when the answer is that a tool you are considering will not do what you need, that is the answer you get. It is the same reason I am useful in the room when two departments are both convinced they are right: I have nothing to defend.

[More about how I got here](/about/), including the roles, the systems and the education behind it.

## Why the economics changed

Data remediation has always been needed and rarely funded, because nobody could size it or say what it returned. Both halves of that moved. The value went up, because clean data is now the difference between an AI initiative that gets believed and one that quietly stops being used. The cost came down, because the archeology, working out what a system does and why it disagrees with its neighbor, is the part that used to take months of expensive people and is now the part that compresses most.

## Start with the Ladder Check

The Ladder Check is a short self-assessment on this site that takes about three minutes and ends in a named result rather than a score. One person can answer all six from memory, with no meeting and no data pull, and one of the outcomes is that you are fine and should go spend the money on the AI itself.

[Take the Ladder Check](/diagnostic/)

## Read the argument

I write about where AI ambition meets the state of a company's data. The current series runs through [how far up the ladder a company can get before its answers stop agreeing](/writing/how-many-customers-do-you-have/), and [what changed in the economics of customer analytics](/writing/customer-analytics-is-worth-another-look/). Before either of those, [the more ambitious you get with AI, the faster you hit a wall](/writing/the-more-ambitious-you-get-with-ai/) is the short version of why any of this matters.

For the work rather than the argument, [the unsexy data work that actually matters](/writing/the-unsexy-data-work-that-actually-matters/) is the full account of a six-month remediation, and [look at the stars](/writing/look-at-the-stars/) is where the customer analytics thinking started.

[All writing](/writing/)
