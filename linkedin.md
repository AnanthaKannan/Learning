 - Q1: Reverse Linked List in Pairs, Input: 1 → 2 → 3 → 4 → 5, Output: 2 → 1 → 4 → 3 → 5
 - How HashMap works internally

```
 - Problem 1: Validate a Custom Expression
 - Given a string with {, }, and *, where * can be {, }, or empty — validate if the expression is balanced.
 - Problem 2: K Most Frequent Words
 - Return top-k frequent words sorted by frequency and lexicographical order.
```



### Low level design
 - Q1: Rate Limiter Design
 - Max 5 requests/user/min

### Security
 - Can JWTs be invalidated?
 - Refresh token flows


### Behaviors
 - Handling pressure & deadlines?
 - Career growth plans?


----

𝗧𝗵𝗲 𝗤𝘂𝗲𝘀𝘁𝗶𝗼𝗻
How does JavaScript's event loop work?

𝗙𝗼𝘂𝗻𝗱𝗮𝘁𝗶𝗼𝗻 (𝟮𝟬 𝘀𝗲𝗰𝗼𝗻𝗱𝘀)
JavaScript is single-threaded with a call stack, but handles async operations through the event loop coordinating between the JS engine and runtime APIs.

𝗖𝗼𝗺𝗽𝗼𝗻𝗲𝗻𝘁𝘀 (𝟲𝟬 𝘀𝗲𝗰𝗼𝗻𝗱𝘀)
𝗖𝗮𝗹𝗹 𝗦𝘁𝗮𝗰𝗸: Executes code synchronously
𝗪𝗲𝗯 𝗔𝗣𝗜𝘀: Handle setTimeout, DOM events, HTTP requests
𝗧𝗮𝘀𝗸 𝗤𝘂𝗲𝘂𝗲: Holds completed async callbacks
𝗠𝗶𝗰𝗿𝗼𝘁𝗮𝘀𝗸 𝗤𝘂𝗲𝘂𝗲: Higher priority for Promises

Async operations go to Web APIs, then callbacks queue up. The event loop moves queued tasks to the call stack only when it's empty.

𝗞𝗲𝘆 𝗜𝗻𝘀𝗶𝗴𝗵𝘁 (𝟰𝟬 𝘀𝗲𝗰𝗼𝗻𝗱𝘀)
Microtasks always run before regular tasks. This is why Promise.then() executes before setTimeout(0) - microtasks have priority.

Why This Works
✅ Clear structure & correct terminology
✅ Explains priority rules under 2 minutes

𝗙𝗼𝗹𝗹𝗼𝘄-𝗨𝗽 𝗥𝗲𝗮𝗱𝘆
What if sync code blocks?
- It freezes the entire event loop and UI since there's only one thread. Break heavy work into chunks or use Web Workers.

𝗪𝗵𝗲𝗿𝗲 𝗠𝗼𝘀𝘁 𝗖𝗮𝗻𝗱𝗶𝗱𝗮𝘁𝗲𝘀 𝗙𝗮𝗶𝗹…
They memorize the event loop but can't explain how it affects real-world performance.
Or they fumble when asked follow-ups like - Why does Promise.then() run first? or How to prevent UI freezing in long tasks?

𝗧𝗵𝗲 𝗦𝗼𝗹𝘂𝘁𝗶𝗼𝗻: Practicing with senior frontend engineers who've actually used these concepts in production. They can break things down, debug your code, and share real-world insights you won’t find in tutorials.

The best part? You can connect with top tech frontend engineers for FREE here: https://lnkd.in/dvSQqEE6

You’ll get real-time feedback on your code, practice mock interviews, and prep the right way for frontend interview rounds.

No more guesswork - just focused, practical guidance from those who’ve cracked it.

