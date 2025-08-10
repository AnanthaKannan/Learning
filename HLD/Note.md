1. scalability
2. availability
3. maintainable
4. performance
5. flexibility
6. security
7. fault tolerance
8. robust system
9. distributed
10. consistency
11. throughput
12. durability - how long something can last and remain usable, especially under stress, wear, or over time
13. reliability - how consistently something performs as expected over time without failing
--------------------------------
## Time calculation
1Million * 1kb * 365 = .34TB
--------------------------------
1. LRU - Least recent used

## Note
1. Dynamo db transaction support up to 100 records
2. what's app basically handle 2 million connection per server  
3. webserver's are stateless, that means load balancer terminate the request by layer 7.
4. 

## When to consider horizontal scaling
| Metric                        | When to Scale Horizontally                                     |
| ----------------------------- | -------------------------------------------------------------- |
| **CPU usage**                 | Constantly > 70–80% on servers                                 |
| **Memory usage**              | Memory exhaustion, high swap use                               |
| **Request latency**           | Average response time increasing, or spikes in P95/P99 latency |
| **Requests per second (RPS)** | App can't serve incoming traffic fast enough                   |
| **Database query load**       | Slow queries or timeouts due to volume                         |
| **Cache miss rates**          | Redis or Memcached under stress                                |
| **Queue backlog**             | Message queues not draining fast enough                        |

## ✅ Example Rules of Thumb (Very Approximate) (These are general guidelines — real-world numbers vary:)
| Component   | Consider Scaling When...                            |
| ----------- | --------------------------------------------------- |
| **Web/API** | >500–1000 RPS per instance (depending on app logic) |
| **DB**      | Query latency rises OR >80% CPU on DB box           |
| **Redis**   | >50k–100k ops/sec per node (depending on ops)       |
| **Queue**   | Message lag keeps growing despite consumers running |

## 👣 Scaling Plan in Real Systems (Phased)
| Phase | Action                              | Why                                     |
| ----- | ----------------------------------- | --------------------------------------- |
| 1     | **Vertical scaling**                | Easy to do early on                     |
| 2     | **Read replicas for DB**            | Offload read queries                    |
| 3     | **Stateless services → auto-scale** | App servers behind load balancer        |
| 4     | **Database sharding**               | Handle write scaling, region separation |
| 5     | **CDN + cache**                     | Reduce load on backend                  |
| 6     | **Microservices (selectively)**     | Independent scaling, fault isolation    |
