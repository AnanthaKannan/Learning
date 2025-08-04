## 


## What is the use of group id in kafka
1. Message Load Balancing:

   * Kafka uses the groupId to know which consumers belong together.
   * Messages in a topic are distributed across the consumers in the same group — each message is processed by only one consumer in the group.

2. Tracking Offsets:

   * Kafka remembers where each group left off in a topic.
   * This lets consumers resume after crashes or restarts — without re-reading all messages.
   * This is known as consumer offset management.

3. Multiple Consumer Groups = Independent Consumption:

  * If you run another consumer with a different groupId, it will get all messages independently.
  * This is useful if different services/processes need to read the same topic for different purposes.

## So if I add multiple consumer, then the message can be receive partially?
To have both consumers actively receive messages, you need at least as many partitions as consumers.

```
Partition 0 → Consumer 1
Partition 1 → Consumer 2
Partition 1 → Consumer 2
```

| Condition                  | Result                                      |
| -------------------------- | ------------------------------------------- |
| 1 consumer, 1 partition    | Gets all messages                           |
| 2 consumers, 1 partition   | One consumer is idle                        |
| 2 consumers, 2+ partitions | Messages are balanced across both consumers |

### What happen if consumer2 fails
* Consumer 1 will take over the partitions that were assigned to Consumer 2.

* Messages that were not yet committed by Consumer 2 may be reprocessed (depending on offset handling).

| Event            | Outcome                                              |
| ---------------- | ---------------------------------------------------- |
| Consumer fails   | Kafka reassigns its partitions to healthy ones       |
| Rebalance occurs | All consumers pause briefly and re-negotiate         |
| Messages lost?   | No, unless not committed (may be redelivered)        |
| Recovery         | When failed consumer restarts, it re-joins the group |
