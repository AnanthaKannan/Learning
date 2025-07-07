# What is Failover?
Failover happens when the primary node in a replica set goes down (due to crash, network partition, or maintenance). MongoDB detects this failure and automatically promotes a secondary to become the new primary.

* Goal: Minimize downtime and ensure the service stays available.



## Cold  Standby
* Standby system is OFF or not running until a failure happens.
* When the primary system fails:
* The backup system needs to be booted, configured, and brought online.
* Takes the longest time to recover.
* take backup in object storage like S3
<br>
📌 Example:
Imagine a backup server in a rack, powered off. When the main server dies, an admin has to power it on and start services and move existing backup s3 to backup server .<br>

📈 Recovery Time Objective (RTO): High (minutes to hours).<br>
📦 Used when: Cost is critical, and downtime is acceptable for some time.<br>
## Warm Standby
* Standby system is ON but not actively serving traffic.
* It may be partially synchronized with the primary (e.g., periodic replication).<br>
When the primary fails: <br>
Failover happens faster since the backup is already running, but it might still need some state sync or manual intervention. <br>

📌 Example:
A backup database server that’s running and updated every hour. When the primary DB fails, you promote the backup and reroute traffic. <br>

📈 Recovery Time Objective (RTO): Moderate (seconds to minutes). <br>
📦 Used when: Some downtime is okay, but faster recovery is needed.
## Hot Standby
* Standby system is fully active and synchronized in real time.
* It’s usually receiving updates as they happen (via replication or clustering).
* Failover is instantaneous or near-instant.
📌 Example: <br>
A load balancer with two web servers. If one dies, traffic instantly switches to the other without users noticing.

📈 Recovery Time Objective (RTO): Low (milliseconds to seconds).
📦 Used when: Downtime is not acceptable (e.g., banks, stock trading systems).

| 🛠 **Mode**     | 🕐 **Recovery Time**  | ⚡ **Sync Level**        | 💵 **Cost**            |
| -------------- | -------------------- | ----------------------- | --------------------- |
| ❄️ Cold Standby | High (minutes/hours) | No sync or delayed sync | Low (cheapest)        |
| 🌤 Warm Standby | Moderate (secs-mins) | Periodic/partial sync   | Medium                |
| 🔥 Hot Standby  | Low (ms-secs)        | Real-time/full sync     | High (most expensive) |
