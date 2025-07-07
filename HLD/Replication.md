# Replication
Replication is the process of copying data from one database server to others to ensure high availability, fault tolerance, and data redundancy.



1.  one and only one member is deemed the primary node, while the other nodes are deemed secondary nodes
2.  When a primary does not communicate with the other members of the set for more than the configured electionTimeoutMillis period (10 seconds by default), an eligible secondary calls for an election to nominate itself as the new primary. The cluster attempts to complete the election of a new primary and resume normal operations.

3. By default, clients read from the primary [1]; however, clients can specify a read preference to send read operations to secondaries.
4. You can configure how many replicas must acknowledge a write before it’s considered successful.

## What is a Replica Set?
A Replica Set in MongoDB is a group of mongod instances (servers) that maintain the same data set. One member acts as the Primary, and the others are Secondaries.

## Members of a Replica Set:
1. Primary – The main server where all write operations happen.
2. Secondary – Copies the data from the primary. Takes over if the primary fails.
3. (Optional) Arbiter – A special member that only votes in elections (doesn’t store data).

## How Replication Works in MongoDB
1. You write data to the Primary node.
2. The Primary records the operations in a log called the oplog (operations log).
3. Secondary nodes read the oplog and apply the changes to their own data.
4. If the Primary fails, an election is held and a Secondary becomes the new Primary.

## Why Use Replication?
| Benefit           | Explanation                                       |
| ----------------- | ------------------------------------------------- |
| High Availability | If one server crashes, another can take over.     |
| Data Redundancy   | Multiple copies of data are stored.               |
| Read Scalability  | You can read from secondary nodes to reduce load. |
| Backup            | Easier to create backups from secondaries.        |

## What is an Arbiter?
An arbiter is a special member of a MongoDB replica set that: <br>
✅ Does NOT store data<br>
✅ Does NOT become primary<br>
✅ Only participates in elections to help decide which node should be primary.<br>

Think of it as a “vote only” member in the replica set.<br>

## Why Do We Need an Arbiter?
In MongoDB, elections require a majority of votes to choose a new primary. <br>
If you have an even number of nodes, there can be a tie (e.g., 2 nodes: 1 votes for itself, the other votes for itself). <br>
To avoid this, you add an arbiter.<br>
The arbiter votes, breaking ties, but doesn’t add storage or processing overhead.<br>

## When Do You Use an Arbiter?
You use an arbiter when: <br>
✔️ You want high availability, but<br>
✔️ You don’t have resources (RAM, disk, etc.) for another full MongoDB server.<br>
Example:<br>
You have 2 servers:<br>
Server A (Primary)<br>
Server B (Secondary)<br>
If Server A fails, Server B can’t elect itself as primary, because it needs a majority vote (2 out of 3).<br>
✅ Solution: Add an arbiter as a 3rd “lightweight” member:<br>
Arbiter votes in elections.<br>
Now Server B can become primary if Server A fails.<br>

## What happens if an Arbiter fails in MongoDB?
1. If the Primary and Secondaries are healthy:
   * Nothing breaks.
   * The arbiter only helps during elections; it does not store data or handle client requests.
   * So, if there is no election happening, the replica set continues to work normally.

2. If a Primary fails AND the Arbiter is also down:
   * This is a problem if there aren’t enough remaining members to form a majority.
   * Without a majority of votes, the replica set cannot elect a new Primary, and:
   * The system becomes read-only (Secondaries stay in secondary mode).
   * Clients cannot perform write operations because there is no Primary.

## Formula for Majority
```js
Majority = ( Total Voting Nodes / 2) + 1
```

## How Elections Work
1.  Failure Detection
    * All members in the replica set send heartbeat messages (ping) to each other every 2 seconds.
    * If a secondary doesn’t hear from the primary for about 10 seconds (default timeout), they consider the primary unavailable.
2. Triggering an Election
   * When a secondary realizes the primary is unavailable, it calls for an election.
   * Eligible secondaries participate in the election:
     * The node must be voting eligible.
     * It must be caught up enough with the primary's oplog.
3. Voting
   * Each member votes for one candidate.
   * The candidate that gets a majority ( > 50% of votes) becomes the new primary.
   * To prevent conflicts:
     * Election Ids and term numbers are used to track election rounds.
     * MongoDB uses randomized delays so two secondaries don’t call elections at the same time.
4. Replication Resumes
   * Once a new primary is elected:
   * Remaining secondaries sync from the new primary’s oplog.
   * Clients automatically reconnect to the new primary for writes.

## What Happens if the Old Primary comes back
   * It steps down automatically when it detects there’s already a new primary.
   * It re-joins as a secondary and syncs data.

## Failover Timeline (Default)

| Action                | Time (approx.)  |
| --------------------- | --------------- |
| Heartbeat detection   | 10 seconds      |
| Election timeout      | \~2-5 seconds   |
| New primary promotion | \~15 seconds    |
| Total failover time   | **\~15-20 sec** |

## Ensure Majority
* If you have 3 nodes, you can tolerate 1 failure.
* With 5 nodes, you can tolerate 2 failures.

## Application-Level Handling
* During failover, clients see “not master” errors when trying to write.
* Use MongoDB drivers that automatically retry failed writes.
* Configure retryWrites=true in your connection string.


## Multi-Region Design
If your replica set is distributed across regions: <br>
* Place majority of voting nodes in one primary region.
* Use non-voting hidden secondaries in other regions to avoid split-brain and slow elections. <br>

## Priority and Hidden
You can configure priority for secondaries to decide which one should become primary.
* Set higher priority for secondaries that are powerful and geographically close.
* Avoid promoting slower or geographically distant nodes as primary.
```js
rs.reconfig({
  _id: "rs0",
  members: [
    { _id: 0, host: "node1:27017", priority: 2 },
    { _id: 1, host: "node2:27017", priority: 1 },
    { _id: 2, host: "node3:27017", priority: 0 } // hidden node
  ]
})

```

## I have selected one of the secondary to read, if it is fails what will happen
* if your are selected secondary particularly it will fail
* You configured your client for read preference with fallback (like secondaryPreferred). MongoDB driver will then pick another healthy secondary.
  * secondaryPreferred
    * Tries secondaries first.
    * If all secondaries are down, falls back to primary.
  * nearest
    * Reads from the nearest member (primary or secondary) based on network latency.
```js
mongodb://cluster0.example.net/?readPreference=secondaryPreferred
```

## Driver Load Balancing
MongoDB drivers automatically monitor the health of all replica set members.
* If a secondary goes down, drivers will stop sending queries to it.
* They route reads to other available nodes.


## Questions
1. why MongoDB insists on a “majority” to elect a Primary (quorum logic) ?
2. how the election happening
3. how MongoDB elections actually work internally (heartbeat, term numbers, etc.)?
4. is we are read enabled in secondary, is that always point one secondary or is that going to change the secondary.
5. is that replication is db based or collection based
6. we are waiting to secondary to update the data, is that efficient way
7. https://www.mongodb.com/docs/manual/replication/