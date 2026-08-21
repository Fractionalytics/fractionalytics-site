// The self-assessment.
//
// Source of truth for the wording: fra-strategy `artifacts/fractionalytics-self-assessment.md`
// (DRAFT v1, 2026-08-17). Nothing here is invented positioning; both axes come from the
// published article "How Many Customers Do You Have?".
//
// TWO DESIGN RULES THIS FILE OBEYS. Do not "fix" either one.
//
// 1. The ladder is CLOSED here and OPEN in the article, on purpose. An essay that terminates in
//    a verdict gives false comfort; an instrument that does not terminate is not an instrument.
//    Both endings are correct for their own job.
// 2. PASS must stay reachable. A diagnostic that never tells someone they are fine is a sales
//    device wearing a diagnostic costume. Do not soften PASS into a soft yes.
//
// Also deliberate, and all four are rulings: no score out of 100, no email gate before the
// result, no AI-readiness language inside the questions, and no price anywhere.

export const QUESTIONS = [
  {
    id: 'count',
    n: 1,
    label: 'The count',
    question: 'If you asked your CFO and your head of sales, separately, right now, how many customers you have, would they give you the same number?',
    good: '**Good looks like:** Yes, and you would bet money on it. Anything with a "well, it depends what you mean by" in front of it is the finding, not a caveat.',
    options: [
      { value: 'clean', label: 'Yes, and I would bet money on it' },
      { value: 'hedged', label: 'Probably, with a caveat' },
      { value: 'no', label: 'No, they would differ' },
    ],
  },
  {
    id: 'retrieval',
    n: 2,
    label: 'The retrieval path',
    question: 'The last time you needed that number, did you know it, look it up yourself, or ask a person?',
    good: '**Good looks like:** You knew it, or you got it yourself from one place in under a minute. Asking a person is not a small thing. It means the number lives in someone\'s head or their spreadsheet, and it leaves when they do.',
    options: [
      { value: 'knew', label: 'I knew it' },
      { value: 'self', label: 'I looked it up myself' },
      { value: 'person', label: 'I asked a person' },
    ],
  },
  {
    id: 'definition',
    n: 3,
    label: 'The definition',
    question: 'Could the four people who report to you each write down what makes someone an "active customer" and produce the same sentence?',
    good: '**Good looks like:** Yes, and there is a written definition they would all point to. "Everyone knows what we mean" is the answer that precedes finding out that they do not.',
    options: [
      { value: 'clean', label: 'Yes, and it is written down' },
      { value: 'hedged', label: 'Roughly, but nothing is written' },
      { value: 'no', label: 'No, they would differ' },
    ],
  },
  {
    id: 'identity',
    n: 4,
    label: 'Identity',
    question: 'When the same company shows up in two of your systems, does something decide they are the same company, or does a person?',
    good: '**Good looks like:** A system does it, and you could name the system. If the answer is a person, or a quarterly cleanup, or nobody, then your customer list is an opinion with a timestamp.',
    options: [
      { value: 'clean', label: 'A system, and I could name it' },
      { value: 'hedged', label: 'A person, or a periodic cleanup' },
      { value: 'no', label: 'Nothing does' },
    ],
  },
  {
    id: 'height',
    n: 5,
    label: 'Height',
    question: 'How far up this ladder do you get before you would have to caveat the answer?',
    ladder: [
      'How many customers do you have?',
      'Are you growing or shrinking?',
      'How many of those are new versus retained?',
      'How efficiently are you growing?',
      'Which cohorts are carrying the growth?',
      'How does growth break out by geography, product line, or the business unit you acquired?',
    ],
    good: '**Good looks like:** Rung 4 or higher, with no hedging below it. Each rung holds only if the ones before it do. You cannot say whether you are growing without the count, because growth is two counts compared.',
    options: [
      { value: 'low', label: 'Rung 1 or 2' },
      { value: 'mid', label: 'Rung 3' },
      { value: 'ok', label: 'Rung 4' },
      { value: 'high', label: 'Rung 5 or 6' },
    ],
  },
  {
    id: 'disagreement',
    n: 6,
    label: 'The last disagreement',
    question: 'The last time two numbers disagreed in a meeting, how did it get settled?',
    good: '**Good looks like:** Someone checked a source everyone already accepts, and that ended it. If the more senior person\'s number won, or the topic quietly moved on, you do not have a disagreement problem. You have an authority problem standing in for a data problem, and it will recur every quarter.',
    options: [
      { value: 'source', label: 'Someone checked an accepted source' },
      { value: 'seniority', label: 'The more senior number won' },
      { value: 'dropped', label: 'It quietly moved on' },
    ],
  },
];

export const VERDICTS = [
  {
    id: 'pass',
    name: 'You are in better shape than most',
    summary: 'Answers agree, retrieval is self-serve, you reach rung 4 or higher, and disputes end at a source.',
    body: [
      'You are not the bottleneck on this company\'s AI work, and the honest advice is to go spend the money on the AI itself.',
      'That is the whole result. There is no service on the other side of it, because you do not need one. A self-assessment that never returns this outcome is not a self-assessment.',
    ],
  },
  {
    id: 'retrieval-gap',
    name: 'Retrieval gap: the numbers are fine, the access is not',
    summary: 'The count and the definition hold. Getting to the number still needs a human in the loop.',
    body: [
      'The organization agrees on the answer; it just cannot reach it without going through a person. That is the cheapest of the three failure modes to fix, and it is often weeks rather than months.',
      'It is also the outcome most likely to be misdiagnosed as a data problem and sold to you as one. Before anybody proposes a cleanup, make them show you which records are actually wrong. If the answer is none, you have a plumbing job, not an archeology job.',
    ],
  },
  {
    id: 'definitional-drift',
    name: 'Definitional drift: you agree on the records, not on what counts',
    summary: 'Everyone is looking at the same rows and counting them differently.',
    body: [
      'This usually happens because a definition moved once and only some of the systems were told. Nothing is corrupt. Every number in the building is correct according to the rule the system that produced it is following, and the rules stopped matching.',
      'It is expensive in a particular way: it does not look like a failure. It looks like two competent teams disagreeing, which reads as a personality problem right up until someone traces both numbers back to their definitions.',
    ],
    reading: 'the-unsexy-data-work-that-actually-matters',
    readingLabel: 'The Unsexy Data Work That Actually Matters',
  },
  {
    id: 'identity-drift',
    name: 'Identity drift: you do not agree on who the customers are',
    summary: 'Two systems hold the same company twice and nothing reconciles them, so every number downstream inherits the ambiguity.',
    body: [
      'This is the most expensive of the three, and it is the one that quietly voids software you have already paid for. A campaign tool, a CDP or an AI agent pointed at a customer list that is an opinion will produce confident output about people who are not who the system thinks they are.',
      'It also compounds. Every month it goes unfixed is another month of records written against the wrong identity, so the cost of the fix grows while the license keeps being paid.',
    ],
    reading: 'how-many-customers-do-you-have',
    readingLabel: 'How Many Customers Do You Have?',
  },
];

export const AUTHORITY_NOTE = {
  heading: 'One more thing, from question 6',
  body: 'You said the last disagreement was settled by seniority, or that it went away on its own. That is worth separating out, because it is not a data problem and no amount of cleanup will touch it. When the senior number wins, the organization has learned that checking is not what settles things, and it will learn that again next quarter. Fixing the records is necessary here and it is not sufficient.',
};

// Ordered rules, most expensive failure first. The wording of each trigger comes straight from
// the self-assessment: identity fractures at Q4, definitional at Q3, retrieval at Q2, and PASS
// requires rung 4 or higher.
export function verdictFor(a) {
  if (a.identity !== 'clean') return 'identity-drift';
  if (a.definition !== 'clean' || a.count !== 'clean' || a.height === 'low' || a.height === 'mid') {
    return 'definitional-drift';
  }
  if (a.retrieval === 'person') return 'retrieval-gap';
  return 'pass';
}
