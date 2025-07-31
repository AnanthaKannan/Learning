```
Question: How will you design a scalable notification system?

What I did: I used Kafka, stored notifications in a DB, and wrote the logic to send emails or SMS via 3rd party APIs.

Result: A polite rejection email the next week.

Here's what I should have actually done:
- Before jumping to tools like Kafka or APIs, a good answer starts with thinking.
- I should’ve started by asking:
- What kind of notifications are we sending? (real-time, scheduled, bulk?)
- What channels? (email, SMS, push?)
- What’s the scale? (100 users? 10 million?)


Flow like this:
- A producer service to send an event whenever something happens (like “order placed”)
- That event goes into Kafka, which helps to handle spikes and keep things async
- A consumer service reads events and checks:
- What type of notification?
- What channel does the user prefer?
- Send it using APIs (like Twilio, Sendgrid, etc.)
- If the API fails, retry, maybe 3 times, with delays
- If it still fails, move it to a Dead Letter Queue for manual checks
- Log everything: success, failure, retries, in a DB
- And of course, it monitors everything: delivery times, failure rates, etc.

This way, the system is scalable, resilient, and extensible.

```

1. Design a rate limiter