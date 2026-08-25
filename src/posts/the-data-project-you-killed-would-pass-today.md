---
title: "The Data Project You Killed Would Pass Today"
dek: "You're funding one use case with a number attached. The data foundation arrives as a byproduct."
date: 2026-08-25
origin: https://www.linkedin.com/pulse/data-project-you-killed-would-pass-today-david-smith-mvlme/
cover: "cover-data-project-you-killed.png"
coverAlt: "Title card for the third piece in the series: You were right to say no to data cleanup. Then the math changed."
tags: ["data cleanup","AI economics","ROI"]
series: "Part 3 of 3"
---
Last week, I published Part 2 in this series (https://www.linkedin.com/pulse/customer-analytics-worth-another-look-david-smith-yucbe/), arguing that customer analytics is worth another look because agentic AI has made much of the analysis cheaper and easier. The obvious objection is, "Our data can't support that." For a long time, that was a sound reason to stop, but not so much anymore. Fixing your data foundation makes more sense than ever before.

I typed one line to a collaborator a while back, out of frustration rather than as any kind of thesis:

> One of the hardest things to sell is data cleanup. Nobody wants to pay for that. And everybody needs it. Especially now.

I've been thinking about that statement ever since, mostly because it's such a contradiction.

Here's what I've come to believe about why. When someone brings you a data cleanup project, all three of the answers you'd need in order to decide are missing at once. The benefit arrives as some version of "everything gets better," which isn't a number. The cost is impossible to estimate before anyone knows how big the problem is, so the timeline could run a quarter or a year. And the risk is buried in systems no one has ever read end to end, with no checkpoints you could use to kill the project early.

You're being asked to approve a benefit nobody can size, against a cost nobody can produce, at a risk nobody can name. If I'm sitting in your chair I push back hard, and I'm right to. Doing nothing was the responsible call.

## The reason you said no just changed

A data cleanup requires four kinds of work. Archeology comes first: finding the places where two systems disagree, like when the sales report shows 4,200 accounts while finance sees 3,600. Archeology involves working backward to what caused the gap and forward to every report and decision that has been using the wrong number ever since. That's how you learn which problems are worth fixing at all.

Business context comes next, because someone has to explain why those decisions got made and what a fix has to look like from the business side. The people who own the systems on either end supply the technical context. Fixing the records, and making sure the problem doesn't come back, is last. Once the root cause is well understood, that final cost is usually small next to the other three.

One of those four just got dramatically cheaper due to the emergence of agentic AI. The change came from a combination that took time to come together: models that will stay on a long, messy job for hours without losing the thread; agentic harnesses that let them actually run that job instead of merely discussing it; and direct connections to the systems where the mess lives.

At many companies the logic that produces the important numbers sits buried inside reporting tools that were built to display it, not explain it. Until recently, pulling that logic back out made the archeology too expensive to justify.

Some pieces of the combination are old and some arrived in mid-2025. The full combination became usable for this kind of work around the start of this year. I know the shift firsthand. In early 2025 I was doing this work by hand with a chatbot helping me write queries. Handing off the investigation itself wasn't something I could picture then. A couple of months ago, I pointed an agentic harness at a client's systems and ran the archeology that way for the first time. I'm reporting a discovery, not a trend.

The archeology is the part that got cheap, by something like five to tenfold. Fixing the records got somewhat easier, and so did communicating what you find, but the unknown scope was what blocked funding. Until a first pass was done, nobody could price the fixing.

This problem has less to do with competence than with age and how your company grew. After twenty years of accumulated decisions, growth by acquisition, or a few changes of leadership, things tend to drift.

That's the engagement I opened this series with: a decade of drift, invisible until it broke something somebody cared about, and six months of my life reconciling a few hundred thousand customer records that a marketing system and the product database no longer agreed on. I wrote up that project in "The Unsexy Data Work That Actually Matters" (https://www.linkedin.com/pulse/unsexy-data-work-actually-matters-how-we-fixed-300k-mismatches-smith-gt1we/), and I stand by how we did it. What I couldn't see then is how much of those six months would stop being necessary.

That project ran as a weekly loop. My analysis flagged the records that didn't agree, the people who knew the business decided what those records were, and their answers set up the next batch. Six months of that took the mismatches from 300,000-plus down to under 5,000.

My queries worked fine. I was doing the digging by hand, spot-checking data and pulling the results into spreadsheets, so the ground I could cover between two meetings was small. That set the pace for everything else. In the earlier piece, I wrote that the technical work was the easy part and aligning three busy teams was the real work. Half of that survived: the aligning is still the work. But the easy part was also the slow part, and the slow part set the pace.

Agents don't remove the weekly meeting or the deciding. They make it possible to cover much more ground in the week between meetings. The same six-month project would take about a month.

It wouldn't compress to a day because some of the work is emergent. Every question you settle surfaces the next place to dig, and knowing which of the answers is wrong is what sets up the next question. The rest is people going away to evaluate what a category of record means. Those two things set the floor, and no tool moves them. Recovering the record of past decisions is research, and research is what got cheap. Deciding which of those old decisions still governs you is governance, and governance doesn't come out of a query.

A first pass gives you a useful boundary. You know roughly what you're dealing with, which parts are understood, and which parts could still widen, instead of facing a number nobody can bracket. An estimate with a defensible range is something you can approve. "A quarter or a year" never was.

## The surprises used to show up in month four

The story a company tells itself about its data is usually worse than what I find.

When people can't size something, they assume the worst. On a client engagement, a first pass came back showing that roughly half of several thousand contracts in a system were broken, which is the kind of number that makes a leadership team go quiet. Then someone on the call asked which of those accounts were actually active, a question nobody at the company could have answered before the pass ran, and the broken half collapsed into a handful that needed a link fixed. One follow-up question took the problem from half the contracts to a few records.

That is the nature of this work today: the machine does the digging and the people who know the business do the deciding. Two of the four parts of a cleanup are human by definition. People stay in the loop, but they stop spending their judgment on guesses.

The risk used to arrive late. A data project has always felt risky because the unpleasant discoveries show up in month four, when the budget is spent and you're too far in to stop. The same pass that sizes the problem now surfaces those discoveries before the commitment. The first pass replaces a worst-case assumption with facts while there is still time to decide.

Sometimes the right answer is to leave a known gap alone, because there's such a thing as good enough data. Knowing where that line falls is much of the judgment in this work. Explaining why a gap exists is worth more to your people's confidence than closing it.

## What that does to the math

All three numbers moved in your favor at the same time. Let's take them one at a time.

The benefit went up, and the reason deserves more than a sentence. In the advice I was giving two years ago, analytics and automated processes were the highest layers I could responsibly price, so the value of everything underneath them was capped at what better reports and marketing campaign automation were worth.

That ceiling lifted. On the same foundation you can now stack automated decisions, then systems that learn from every cycle they run. Each layer is worth more than the one below it, and every one of them stands on the bottom layer, where the business agrees on what its numbers mean.

A person sitting between the data and every decision could absorb the errors before they landed anywhere, which is the unpaid work part one of this series was about. A system acting unattended absorbs nothing. It inherits every disagreement sitting in the data underneath it.

So the foundation is worth more than it was two years ago, not because your data changed, but because what you can build on top of it changed. The more of your business you want to run on systems that act without a person checking behind them, the more the data underneath is worth to you.

[IMAGE. File: killed-layer-cake.png Alt: A stack of layers. From the bottom: agreed definitions, everyone sees the same numbers, analytics, automated processes, automated decisions, and at the top a system that learns from every cycle. Caption: Each layer stands on the ones below it, and each is worth more than the one below it.]

On cost, the archeology now takes roughly one-fifth to one-tenth of the effort it took before.

Risk falls because discoveries that used to ambush you in month four now arrive before you commit.

Together, those changes expand the set of projects worth doing. Any investment has to return enough to justify its cost and risk, and data cleanup often failed that test. Priced today, the same projects cost less, carry less risk, and return more. There's more of that work sitting around than anyone realizes, because a project that fails this test doesn't stay on a list anywhere.

It just stops being discussed.

[IMAGE. File: killed-roi-equation.png Alt: Benefit divided by cost times risk, with the benefit rising and the cost and risk both falling. Caption: The new economics of data cleanup: all three moved at once.]

At that point, cleanup stops being a housekeeping question. What I've observed is that the block on pushing automation deeper into a business has never been ambition or tooling. It's that nobody trusts the numbers enough to let a system act on them unattended. That constraint has been the expensive one for as long as I've been doing this work, and it just got much cheaper to remove.

## You're not buying data cleanup

I still wouldn't ask you to approve a data cleanup project.

You're buying one use case with a number attached: the churn model you couldn't build, or the marketing automation you bought and can't turn on, or the board metric you argue about every quarter. Approve that, and the foundation arrives as a byproduct, because you only clean what the use case consumes. That constraint gives the bill an end. Leave the rest of the archive alone until something needs to read it.

[IMAGE. File: killed-vertical-slice.png Alt: The same stack of layers with a narrow vertical slice cut through all of them, from the definitions at the bottom to the learning system at the top. Caption: One use case cuts through every layer. You clean only what it touches.]

Scoping it that way is also the only way the benefit ever gets a number. Clean data has no standalone value a buyer can defend, but a churn model does. So does the marketing automation or the time spent arguing about a board metric every quarter. You're valuing the thing you already want and can't have. That number has often been sitting in someone's business case for a year.

Each use case also pays for ground the next one doesn't have to buy again. At a payments company I spent three weeks leading a task force on a single number, the contribution margin, that four different teams each calculated slightly differently and each corrected by hand every reporting cycle. The task force didn't produce the fix. It produced one agreed-upon picture of the problem, and that was enough: the company expanded a project one team had already started into the fix for all of them, and funded the six-month rollout itself.

That project is also the honest test of everything I'm claiming here, because it ran in early 2025 and none of it depended on anything that has happened since. It got approved because the company was large and the prize was large enough to carry a fuzzy estimate. That is the part worth noticing. The scoping trick isn't new. What was new is how few projects could clear that bar.

Scoping doesn't stop the drift that produced the mess. Left alone, the same problem can return within a year and you get to fund it twice. Fixing the root causes where you can, and putting a cheap watch on the places you can't, is what turns the project you just approved into a foundation the next one can stand on.

## BI before AI still holds

In late 2024 I wrote a data strategy for a client that said, in bold, "BI before AI," borrowing the framing from Joe Reis. BI stands for business intelligence. I still think that advice was right. What I didn't see coming is the move that makes this piece necessary: AI can now do much of the archeology, which produces reliable BI, which is what earns you the confidence to let AI run parts of the business.

You were right to say no. The cleanup proposal you rejected didn't deserve funding under the ROI analysis available then, and nothing here changes that. Now the benefit can be tied to a use case, the cost can be bracketed, and the risk can surface before the budget is committed. Each answer is better than it used to be, not merely clearer.

The next time this comes up, ask which one thing you're already trying to build and can't, then find out which data stands in the way. That question has an answer now. A couple of years ago it didn't.
