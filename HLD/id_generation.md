#### UUID (Universally Unique ID)

* Format: 550e8400-e29b-41d4-a716-446655440000
* Generated locally on each server
* No coordination required

Pros:

* Simple and globally unique
* No central coordination

Cons:

* Not human-readable
* Can’t sort easily
* Not DB-friendly for indexing (especially in SQL)

#### Snowflake ID (Twitter’s Algorithm)
Structure of a 64-bit ID:
```
| timestamp | datacenter ID | worker ID | sequence |
```
Each server gets a unique worker ID.

Pros:
* Globally unique
* Time-sortable
* Compact and fast

Cons:

* Requires a way to assign worker_id to each insert server (e.g., config or service registry)
* Slight complexity