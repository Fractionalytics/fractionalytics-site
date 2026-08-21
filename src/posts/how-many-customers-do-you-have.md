---
title: "How Many Customers Do You Have?"
dek: "How far you get before the answers start depending on who you ask is the most useful read on AI readiness I know."
date: 2026-08-10
origin: https://www.linkedin.com/pulse/how-many-customers-do-you-have-david-smith-rsgxe/
tags: ["AI readiness","customer data","data quality"]
series: "Part 1 of 3"
---
Six weeks into the job, the CMO pulled me aside about a customer data platform project they were having trouble with. She'd signed a six-figure annual license and was paying for it every month while getting nothing out of it. It looked like a pace problem: a cross-functional data, marketing and vendor team not moving fast enough toward implementation. The tool sat right there, unusable, because the data underneath couldn't run automated campaigns.

At first it was a plumbing job: connect the customer database and turn it on. But once we did that a new problem emerged: the two main upstream systems disagreed. The same customer carried a different ID in each one. Email addresses had drifted apart. Thousands of records sat in the product database with no match in the marketing system at all, and every one of those was supposed to be a customer. And the status fields contradicted each other, so someone marked active in one system came back churned in the other. Neither system was more trustworthy than the other, and we couldn't tell a lead from an active customer from a former one.

We didn't have an accurate count of our own customers.

Underneath the hundreds of questions you might ask about your business, there's a short stack that a lot of the others depend on. It's less a list than a ladder. The first rung is the question this piece is named after, and every question after it is a higher rung: it holds only if the ones before it do.

| Rung | The question |
|---|---|
| 1 | How many customers do you have? |
| 2 | Are you growing or shrinking? |
| 3 | How many of those customers are new versus retained? |
| 4 | How efficiently are you growing? Do you have a leaky bucket or is churn modest against what you're adding? |
| 5 | Which cohorts are actually carrying the growth? |
| 6 | How does the growth break out by geography, by product line, by the business unit you acquired? |

...and on and on. This is not an exhaustive list, but just the start.

Each rung depends on the ones before it. You can't say whether you're growing without the count, because growth is two counts compared. You can't separate new customers from retained ones until you've agreed which records count as customers at all. Cohort efficiency by geography sits four rungs above a number your departments define differently, and no amount of AI model quality closes that gap, because the model is standing on the same rung you are.

So the whole ladder stands on Rung #1: **How many customers do you have?**

Before you answer, notice what you just did to get the number. Did you know it, or did you go looking? Where did you go? Did you ask an AI agent or a chatbot? Is it emailed to you every morning? Was it in a dashboard, or did you end up in a spreadsheet? Did you have to ask a person, and does the answer change depending on which person you ask?

How far you get before the answers start depending on who you ask is the most useful read on AI readiness I know.

How you retrieve the number further bolsters your answer to the AI question.

There's a question sitting underneath the count, and like the first one it sounds elementary until you have to pin it down. How do you define "customer?" Does it have to be an "active" one, meaning someone who has bought from you in the last 30 days or whose membership dues are current? Or is the definition broader than that? If so, why?

Any hesitation there is the finding. Rung #1 exposes whether the people around you are counting the same thing.

If you answered Rung #1 instantly and with confidence, don't stop there. The real test is whether the four people who report to you produce the same number without conferring, and my guess is you've never run that experiment.

## Whose KPI is right?



When you do, two very different things tend to come back, and they rarely get separated, which is part of why neither one ever gets fixed.

**The first is that people disagree about what the number means.** Product and sales look at the parent account, because that's who signs. Customer success counts each location, which is entirely defensible if individual locations can churn or renew on their own, because then each location really is behaving like a customer. Finance looks at it from the perspective of accounting standards, because finance is answering a different question. The failure only appears when you ask them to aggregate to a company number, and then your leadership team ends up in a meeting where one person says "3,900" and another says "35,400," and the uncomfortable truth is that they're both right, depending on the frame. The customer count is often where it surfaces first, because it's the number the most people need and the fewest people agree on.

**The second is that the number itself has drifted.** This one has nothing to do with definitions. Drift is a long series of individually reasonable decisions that nobody ever reconciled with each other: systems that were supposed to stay in sync stopped talking, a migration left records behind, a field got repurposed and nobody told the reports downstream. Somebody in finance knows the Q3 figure runs high and adjusts for it. Down in operations, a report gets pulled, exported to Excel, and massaged the last mile before anyone upstairs sees it. Your best regional analyst knows which records to trust and which ones to check first.

Those are unrelated problems with different fixes: the first is a decision and the second is repair work. But they arrive at your desk as the same symptom, which is that you can't trust the number, and it doesn't much matter to you which one is responsible, because either way you're not going to bet a quarter on it.



## Whose job is it?

Neither one gets fixed, and the reason is structural: **nobody owns data hygiene**. Look at your org chart. Your CFO owns the cash and your general counsel owns the IP, and nobody at all owns what "active customer" means, so it might fall to marketing, growth, or even IT by default. None of them is the right home, and not for any reason that reflects on the people there. Defining what counts as a customer is not part of any of their jobs. Your data runs through every system in the business, not just the ones any one team uses, and it belongs to no single team, so the question falls between the seats instead of into one.

Deciding what "active customers" are so you can count them is a question about what business you're in, and it's the rare decision that cannot be delegated downward.



Nobody inside the building can tell you how far off the number is, or why. The front line can see what's wrong but struggles to translate it into something an executive can act on, and the executives can't check it themselves, because most people who came up over the last thirty years were handed dashboards rather than lineage. Lineage is the record of where a number comes from and what happens to it at every step along the way. It's not a boardroom word yet, and it should be, because it's the difference between knowing what a number says and knowing whether to believe it.

## What happens when you take the person out

And none of it has hurt you yet, which isn't luck. Your people have been absorbing both problems for years, as part of their jobs. None of that work has a line item, which is exactly why it's never appeared anywhere you could see it, and why nobody has ever brought you a bill for the problem. You've been buying trustworthy numbers this whole time, and paying for them in your people's attention, which is something that never appears on a P&L.

An agent is software you turn loose on a goal rather than walk through fixed steps, and it absorbs neither the disagreement nor the drift. It can't look at a number and intuit that something is off, which is a thing experienced people do constantly without being able to tell you why, and there's no hallway for it to walk down and nobody for it to ask what a field actually means. It takes the rung you hand it and climbs.

A failure would at least be obvious. Instead, you get an answer, delivered confidently, at speed, and in volume. And this is the part that should stop you before you build anything: if you don't trust the data underneath, you're not going to trust what the AI tells you either. You'll feel compelled to go check it by hand, which is precisely the work you were trying to automate. An AI initiative built on numbers your leadership team argues about gets abandoned by degrees. People check it, then double-check it, then stop opening it, and nobody ever makes a decision to shut it down. It just dies on the vine.



Every quarter the question goes unanswered, somebody builds one more thing on top of the wrong rung. The pile of work that will eventually have to be redone keeps growing while you wait.

## What to do at your next leadership meeting

Take the customer count and try to answer it yourself first. Write it down. Then at your next leadership meeting, one that's already on the calendar, ask everyone in the room to write their own answer on an index card before anyone speaks. Then read them out.

That takes five minutes, costs nothing, and there's no way to hand it to anyone else, because the question isn't technical and nobody below you can answer it for you.

Whatever comes off those cards is your diagnosis. If the numbers match, you're in better shape than you thought, and you can push automation and AI harder than you have been, starting with whatever you've already paid for and haven't switched on. If they don't, you may have found the reason your last AI initiative didn't land, and you found it in five minutes rather than in a costly assessment.

Be clear about what that meeting has and hasn't done, though. Surfacing the disagreement is the cheap part, and you just did it for free. Turning "3,900" and "35,400" into one number that finance, sales, product and the board all sign, and then making every system downstream produce that number, is the expensive part, and it's the part you can't do from the head of the table, because everyone in the room is correctly defending their own department's answer. A room accepts a hard finding more easily from someone with nothing to defend.

A client said something to me recently and she was right: fixing the records doesn't fix the mistrust by itself. Trust gets earned the same way it does between people, which is repetition: the number comes out matching what the business knows to be true, and then it does it again, and again, over six or twelve or eighteen months, until one day people stop double-checking it. You can't buy trust, you can only start to earn it.

---

*I'm David Smith. I set AI strategy with leadership teams, build the data and systems underneath it, and ship the highest-leverage pieces myself. If you're looking at a version of this, I'd like to hear about it.*
