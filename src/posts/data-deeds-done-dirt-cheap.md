---
title: "Data Deeds Done Dirt Cheap"
dek: "A comprehensive review of the data practice I built at a venture firm, and everything it touched."
date: 2024-05-01
origin: https://www.linkedin.com/pulse/data-deeds-done-dirt-cheap-david-smith-dwmsc/
cover: "cover-data-deeds.jpg"
coverAlt: "Cover illustration for Data Deeds Done Dirt Cheap."
tags: ["data practice","venture","growth accounting"]
---
## Looking Back

Yesterday was my last official day working full time at TheVentureCity, a global VC investment platform.

I spent the last six years founding and leading our data team. Not every VC has a data team, but for us it worked because it provided value to our founders and investors. Indeed, the team will continue to live on under new leadership.

StockOpine's tweet helped inspire this post:

This is the first of a series of posts in which I reflect upon what I learned during my time at TheVentureCity. I'm doing this mostly to organize my own thoughts and feelings. At this inflection point in my career, I feel the need to take a minute to get perspective on what I've done before redirecting my energy to the future. As William Faulkner wrote, "The past is never dead. It's not even past." The concepts I write about are alive within me and will continue to inform how I think. Now seems like a good time to articulate my thoughts and consolidate the lessons I've learned. Since others might learn from this too, I thought I'd share.

## Starting Out

When asked about what our team at TheVentureCity did, I'd usually give a very broad answer: We helped TheVentureCity and our startups use data to their advantage. After all, those were essentially my only instructions when I first joined the company: "data is probably important to investing in and building tech companies," the reasoning went, so I had to figure out what that meant for us. It was the type of "blue sky" project that I love, a complex, ambiguous puzzle to be solved.

I quickly realized I needed to narrow my scope in those early days because "anything data related" was simply too broad and would pull me in too many directions. While not new to working with data, I was new to VC investing. In those first weeks and months, I did a lot of reading to find out what smart investors were doing out there. I found people experimenting with using data at all steps in the VC funnel, from sourcing new deals, to screening companies and founders, to due diligence, to portfolio value creation.

In talking to our investment team, it didn't seem like dealflow was a chokepoint–we didn't need more deals to look at. Scraping LinkedIn or Crunchbase looking for announcements of new startups or employee movements seemed like interesting ideas, but I wanted to hear about someone doing it successfully first.

I narrowed my focus to the lower part of the funnel–investment due diligence and portfolio management–and wondered if I could leverage customer analytics to add value to these activities. Customer analytics leverages the idea that businesses are the sum total of each individual customer's activities. If you can get data on how each customer is behaving over time, you can use customer analytics to see things about the business that are hard to discern with the naked eye. It becomes possible to segment customers based on behavior and lifetime value. I had been exposed to the power of customer analytics in my time on the Insights team at Anda and from organizing Miami Data Science Meetup events (in particular one memorable talk by Evan Oster). I started to investigate how it could apply to VC investing.

It didn't take me long to find Jonathan Hsu's series of blog posts for Social Capital that spelled out how they looked at "growth accounting," a standardized way of measuring and visualizing growth, retention, and engagement for both active users and revenue. A startup with strong growth accounting metrics grows active users and revenues very quickly and efficiently by retaining most of those users and revenues over time. I carefully dissected everything he wrote in those posts and subsequent ones for Tribe Capital. I've learned I'm good at spotting good ideas, and this was a good idea. In particular, Hsu's analogy linking growth accounting to GAAP accounting resonated with me. Each is a standardized way of looking at companies. The former is appropriate for VC-funded startups, while the latter is appropriate for public companies.

Hsu's public thought leadership became the basis for our analytical framework at TheVentureCity.

## Testing

To put Hsu's growth accounting framework into practice, we needed companies' data. That means lots of very granular, transaction-level data. Initially, it was something of a tough sell.

"Hey, would you please send us your entire history of transactions with customer ID's and amounts."
"That could be millions of records!"
"Perfect!"
Either, "Yeah, no. That sounds like a lot of work and I don't have time." or "How will I know these will be secure?" or "Can I just send you the aggregated data in Excel from our data room?" or "Okay, sure."

Despite some early pushback from founders, we did manage to convince our first company to turn over some data during the due diligence phase. Since I didn't have much infrastructure at my disposal, I fretted over what tools to use. Excel? R? Python? Put everything in a database and run SQL? I settled on Python. (You may see and use a later manifestation of that early work in the Data Pipeline Toolkit I wrote and published to GitHub in 2019. It has recently been updated with the latest Python libraries.)

I ran the first dataset through the analysis and out came the results. They showed that MAU and MRR growth had stalled and there were unexpectedly high rates of MRR churn. Hmm. Using this data as a jumping off point, we had a highly constructive and no-nonsense discussion with the company's leadership team about their challenges and how we could best support them. The analysis and subsequent discussion was an "Aha! moment" for our investing team and me. Customer analytics hadn't answered all of our questions; rather, it helped us ask much better, below-surface-level follow-up questions that honed in on the critical success drivers of the business. The leadership team's responses helped us assess their business acumen by seeing how well they understood those drivers.

## Iterating

This pattern of customer analytics derived from raw transactional or event log data revealing the most important lines of inquiry repeated itself again and again. In VC, it can be hard to quantify results due to multi-yearlong feedback loops. But qualitatively, the team and I felt like we were on the right track with this approach to leveraging customer analytics in the due diligence process. We kept asking founders for their data and found that, if we could illustrate to them why it would be worth their while, they found value in handing it over. Personally, I performed growth accounting analysis on hundreds of companies' data. Later, I trained members of my team to look at hundreds more. In most cases, we were able to show them something meaningful about their business that they had never seen or considered.

## Expanding

Our early-stage investment activity ramped up, and we began shepherding 30+ companies per year through our accelerator program designed to help them achieve product-market fit (PMF) and stimulate product-led growth (PLG). In addition to looking at customer-level data during the due diligence process (when available), we also helped them instrument their products so they could start leveraging customer analytics on their own. Understanding users' and customers' behavior is the best way for a product team to see what users think of the product.

The opportunity to collaborate with founding teams from all over the world, in a variety of industries, leveraging a variety of business models was one of the intensive learning experiences of my career. It was like working on 3-4 real-life business school case studies at a given time, with more coming all the time. Some patterns started to emerge:

- The companies were too small to hire their own data person
- The founders appreciated and valued what I was able to show them about their business
- Most would benefit from instrumenting with Segment and using Amplitude for analytics
- Companies that had their data in order generally tended to operate more effectively overall, so much so that it became something to look for in due diligence

These factors led us to expand our efforts around data. First, we tried to move beyond the initial Python scripts by adopting a monolithic analytics platform to make ingesting, storing, transforming, and sharing the data easier at scale. We hired a product data analyst in our Madrid office to handle the European companies, and later a data analytics engineer to help facilitate the flow of data within our organization and from our startups. In many cases we acted as a company's "bridge" data team while they grew big enough to get to the next funding round, when they would be able to afford to hire someone.

## Educating

As we expanded the number of companies we needed to reach, we needed to to educate our founders on what was possible to do with the data their companies were generating. As the proverb goes, "Give a man a fish and you feed him for a day; teach a man to fish and you feed him for a lifetime." I published blog posts and delivered presentations around the following topics…

- **"Measuring the Health of Your Startup"** – Growth accounting is like an annual checkup at the doctor's office. It's pretty quick and lets you know areas where you might need to see a specialist.
- **"From Engagement to Retention to Growth"** – Identifying engaged users is a key first step towards getting them to return repeatedly, which is an important precondition for efficient growth.
- **"Product-Market Fit Fundamentals"** – There are three categories of qualitative and quantitative signals that help you determine the strength of signal when assessing PMF.
- **"Customer Centricity & Lifetime Value"** – Celebrate heterogeneity among your customer base and treat each group of customers differently.
- **"Using RFM for Customer Segmentation & Marketing Strategy"** – Another lens on customer lifetime value, this talks about specific strategies for different behavioral segments.
- **"Tell Your Story With Data"** – Apply Freytag's Pyramid to your startup pitch deck and selectively use data to support your hero's journey. It turns out there is a lot of overlap between creating convincing data visualizations and creating convincing startup pitches!

The feedback that I got from these talks was very positive. Founders seemed to appreciate being empowered to view their business through a customer analytics lens. I considered it advertising for our team. Once a founding team heard one of these talks, they felt a sense of trust and were much more willing to give us their data to analyze. Founders' enthusiasm for the material put wind in the data team's sails.

## Building Trust

Building trust and credibility has always been important to me in my career, never more so than when leading the data team at TheVentureCity. The educational sessions mentioned above were, as much as anything, about establishing our team as capable, dependable partners, there to help our founders and investment team members however possible. From there, we tried to use every interaction–-whether while setting up a data pipeline or delivering an analysis–-as another opportunity to associate the concept of "credibility" with the concept of "data team."

On many occasions, we noticed discrepancies between what our data said and what the founders were reporting. The data team took this (almost) personally as a threat to our brand: we never wanted to be out of sync. Some examples included…

- Many times, a startup's definition of "active usage" would change to include a new feature, and we had to update our queries.
- We once had a mismatch between our dashboard and theirs because they were in California and our query was using Coordinated Universal Time (UTC). Once we told BigQuery what timezone to use, problem solved!
- Being global investors, exchange rates frequently got in the way. We always liked to standardize on US Dollars whenever possible.

On such occasions, we did our best to be very transparent and detailed with how we were transforming, aggregating, or calculating the data. We never wanted any unresolved issues out there gnawing away at our credibility. If a data team is viewed as untrustworthy, then it can't add any value because everyone stops listening.

## Enhancing

From the data team's customers–our investment team and the startup founders–we began to realize that calculating absolute numbers wasn't enough. Instead of just measuring a month-over-month active user retention rate, for example, we needed to be able to put it into context by comparing it to similar companies.

At first we struggled with how to do meaningful benchmarking. Sure, we were gathering proprietary data from more and more companies every week and, eventually, we might get enough density in a particular vertical and/or revenue model that we could start to infer from the range of values what is good vs. what is not so good. But until that point, we just didn't have enough examples to draw from. We were always comparing apples to oranges.

Then, on June 9, 2020, Lenny Rachitsky published issue #29 of his newsletter, entitled "What is good retention?" Instead of looking at raw data from lots of companies, he surveyed industry experts and published where their ranges were. At last, we could at least give most of our founders a data-driven answer to whether their retention was any good. A former AirBnB product manager embarking on what would become a wildly successful second act as a thought leader to product managers everywhere, Lenny had spoken at TheVentureCity's campus in Miami in January 2020, so we knew him to be credible. As time went on, we created a lenny_rachitsky_thresholds lookup table in our data warehouse and began including Rachitsky's good and great thresholds on all of our standard dashboards. It became the basis for normalizing the performance of all of our startups on a standard scale to get apples-to-apples comparisons and better visualize the performance of the portfolio.

We sought to enhance our thinking in other ways too. We worked with our accelerator startups to use Sean Ellis's PMF survey so they could gather a different type of data that would be helpful in their journey. He asks one main question: "How would you feel if you could no longer use the product?" If 40% answer "very disappointed," that's a strong signal of PMF. A First Round blog post about Superhuman Mail's emphasis on using this technique went viral in the startup community and helps illustrate how to use it.

I also began tinkering with incorporating customer lifetime value (CLV) and unit economic analysis into our analysis framework, leveraging the work of Wharton's Peter Fader and many others. Since we already had the customer-level historical transactional data from many of our startups, we could fit predictive models for residual customer value (the future amount that each customer is predicted to bring in based on past behavior). Comparing CLV with marketing spend helped larger startups/scaleups visualize and understand the value each cohort of customers brings to the business over time. Such analysis became part of customer base audits we conducted for some of our larger portfolio companies and third-party due diligence opportunities. We called these "deep dives," which went well beyond the surface-deep growth accounting analysis. In one example, I was able to illustrate to a company's board that customer acquisition and product mix were trending in the right direction and that there were pockets of untapped value in the customer base, providing an analytical justification for further investment.

However, we had to be selective with deep dives into CLV and unit economics analysis because many of our companies weren't mature enough for it. CLV models only work when companies know who their customers are and have reliable ways of acquiring them. If you only have 12 months of operating history, how confident can you really feel in a model that projects 36 months into the future? We had to get creative to find ways to make the underlying concepts of CLV and unit economics useful to younger companies. Instead of using models to make long-term projections about CLV, we had them focus on their payback period: the number of months it takes to make back your marketing spend based on how much customers buy and how many of them stick around for multiple months. Using short payback periods to illustrate capital efficiency can be a good look in a Series A pitch deck.

Another way CLV-inspired analysis helped was to make simple time series plots in Tableau or Count showing a dot every time a customer purchased.

[IMAGE. File: deeds-customer-timeseries.png Caption: Each customer's time series is on its own row and the size of the circle represents the relative dollars spent]

It's not exactly cutting-edge data science, but on some occasions, simply visualizing customer activity in this way helped identify purchasing patterns that triggered ideas in a founder's mind. I recommend it.

As Kirby Ferguson says in his brilliant video, "Everything is a Remix." We continuously learned from some great thought leaders who generously shared their work publicly. When we found something that we thought could help, we tested it with our customers. If the feedback was positive, we incorporated it into our analysis framework.

## Scaling

As the number of companies that we looked at and the number of companies in our portfolio grew, so too did our data infrastructure needs. We wanted automated data pipelines from dozens of startups to power up-to-date growth accounting dashboards. We wanted to share those dashboards between our teams and the startup founders. And we wanted to minimize headcount.

It became increasingly clear that our monolithic analytics platform wouldn't work. Oops! It was too closed to facilitate sharing and too inflexible to allow for a modular approach. We needed to run each company through variations of a standard analysis, and the platform didn't allow us to follow DRY coding practices–"Don't Repeat Yourself." Instead we needed separate instances of almost the same code, which got very cumbersome and annoying to maintain. (If you want more detail on this, DM me.)

It was time to think differently. If only I had heard about this Modern Data Stack concept sooner! It turns out, that for our use case–and that of many other companies–assembling easy-to-use components was superior than a monolithic platform.

We spun up a cloud data warehouse instance (in our case we picked BigQuery); deployed a no-code data ingestion tool like Fivetran (which we later swapped out for Hevo) to collect raw click and transaction streams from our startups; transformed the raw data into something usable in a dashboard with dbt orchestrated with GitHub Actions; and presented insights back to our customers with visualization tools like Redash, Count (one of our portfolio companies), and Tableau (desktop only), or other methods like Slack and Notion integrations–-whatever was necessary to serve a given use case.

This architecture served us well for several reasons:

- dbt treats data transformation SQL + Jinja + Python code like it's the software that it is. It allows for passing in parameters; reusing code through modular macros; and source code control using Git and GitHub. No longer did we need slightly different versions of the same code to handle multiple companies.
- It more closely resembled an architecture that one of our startups could deploy themselves. Indeed, once we started to reap the benefits of the modern data stack approach, we evangelized it throughout our portfolio and helped many of our founding teams to modernize their own stacks.
- Assembling components meant that we could swap out any one of them if we needed to. Two years into the modern data stack project, Fivetran warned us of a price increase. Instead of renewing, we tested other solutions and ultimately migrated to Hevo. Besides having to make a few minor tweaks in dbt to accommodate some new raw data formats, none of the other components had to change.
- Fivetran and Hevo are both low-code. One of our guiding philosophies is to write as little code as possible; otherwise, you have to maintain and look after it.
- Retool is also a low-code tool, but it has an API that we leveraged to created dashboards through a Python script, dramatically reducing the time it took to instantiate new dashboards. We like products that balance low-code for end-users with allowing the data team to write code to interface with them so we get the extensibility we need.
- Count's canvas UI allowed for us to create beautiful-looking reports and push notifications with minimal effort.

## Take-Aways

- We focused on the due diligence and portfolio management phase of VC investing
- We used customer analytics in the form of growth accounting to assess companies
- Education and transparency were key factors in building trust with our stakeholders
- The startups found value in seeing their business in a new light
- Our investment teams found value in uncovering probing questions to ask founders
- We tested and rejected many approaches before arriving at our eventual data stack
- Taking a modern data stack approach made scaling with a small team much easier

## Recommended Reading

- Jonathan Hsu: Diligence at Social Capital (six-part series); A Quantitative Approach to Product Market Fit; Unit Economics and The Pursuit of Scale Invariance
- Lenny Rachitsky's newsletter
- Wharton's Peter Fader has written numerous books about customer centricity and lifetime value
- Sean Ellis coined the term "growth hacker" and established the 40% rule referenced above
- Dr. Andre Retterath publishes "Data-Driven VC" a thought-leadership newsletter
- Taylor Brownlow of Count writes about the challenges all data teams face at More Than Numbers

## Acknowledgements

Andriy Radich, Evan Oster, Francesca de Quesada Covey, Garoe Gonzalez Parra, Jon Ardinast, Juan Pablo Treviño, Juan Ramiro Meyer, Katya Skorobogatova, Laura González-Estéfani, María Dancausa Vicent, Mario Cantelar Jiménez, Mercedes Plaza García, Roberto Carlos Navas, Santiago Canalejo Lasarte, Victor Servin, Yannick Ruby

\* What's (relatively) dirt cheap in this story was the modern data stack we configured to manage massive amounts of data with a small team. The data deeds were fairly compensated, unlike in the AC/DC song.
