# Load Balancer
A Load Balancer is like a traffic cop sitting in front of your servers. <br>

✅ It distributes incoming client requests (HTTP, HTTPS, TCP, etc.) across multiple backend servers.<br>
✅ It makes sure no single server is overloaded.<br>
✅ If a server goes down, it routes traffic to healthy servers.<br>

Think of it like:<br>

“There are 5 counters at a bank. You go to the receptionist (load balancer), and she tells you which counter to go to based on which is free.”
<br>

## 🛠️ Why do we use Load Balancers in System Design?
1. **Scalability 📈**
Add more servers as traffic grows. LB will distribute the load.
2. **High Availability ✅**
If one server fails, LB sends traffic to others. No downtime.
3. **Better Performance ⚡**
Balances the workload across servers, avoiding bottlenecks.
4. **Flexibility 🔄**
Easy to upgrade, replace, or take down servers without affecting users.

## Types of Load Balancers
* Hardware Load Balancer (expensive, used in data centers) (F5, Citrix)
* Software Load Balancer (e.g., HAProxy, Nginx, Envoy)
* Cloud-based LB (AWS ELB, Azure LB, GCP LB)

## ⚙️ How does a Load Balancer distribute traffic?
  ### Static load balancing (using predefined rules with out considering the real time server condition, while work loads are predictable)
  * Round Robin 🌀 <br>
  Sends requests in order (1,2,3,1,2,3).

  * Least Connections 📉 <br>
  Sends requests to the server with the fewest active connections. for example if the server hit expensive query in the data base, so it will take more time to respond back so the connect will alive for some long time. 

  * IP Hashing 🧮<br>
  Routes requests based on client IP.

  ### Dynamic load balancing (Considering servers realtime condition)
  * Least response time <br>
    Sends the request to the server with the fastest response.
  * Adaptive load balancing <br>
    It is making intelligent routing decision by analyzing cpu usage, memory usage 
  * Weighted Round Robin ⚖️<br>
  Servers get traffic based on their capacity (powerful servers get more requests). <br>
  assign different weight to server based on capacity


## when to use
* software load balancer gives much more flexibility
* cloud load balancer give much more scalability.
* hardware for enter price grader

## Key take away
![alt text](../images/image-6.png)


## Based on Layer
Load Balancers can operate at different OSI layers:
## Layer 7 Load Balancing (Application Layer)
* Operates at: OSI Layer 7 (Application Layer)
* Protocols used: HTTP, HTTPS, WebSocket, gRPC
* Decision based on: URL, headers, cookies, HTTP method, etc.
* Speed: Slightly slower than L4 (more processing)

✅ Example:
An HTTP request comes to https://example.com/api/user, the L7 load balancer: <br>
Sees the path `/api/user` <br>
Routes to User Service instead of other services like `/api/order` <br>

✅ Use case:
* Microservices architectures (based on path)
* API Gateway functionality
* SSL termination
* Advanced routing and security policies

## Layer 4 Load Balancing (Transport Layer)

✅ Example:
An incoming TCP connection to port 80 (HTTP) is routed to one of the backend servers based on IP and port.
<br>
Say a client tries to access:
`https://example.com` <br>
This means: <br>
  * Protocol: TCP
  * Port: 443 (HTTPS)
  * IP: 203.0.113.10

Your L4 load balancer looks at this and just says: <br>
"Send this TCP connection to one of the backend servers running HTTPS."




## Difference between Layer 4 and Layer 7 Load Balancing

| Feature          | Layer 4 Load Balancer                | Layer 7 Load Balancer                    |
| ---------------- | ------------------------------------ | ---------------------------------------- |
| Layer            | Transport Layer (L4)                 | Application Layer (L7)                   |
| Protocols        | TCP, UDP                             | HTTP, HTTPS, WebSocket, gRPC             |
| Routing Based On | IP, Port                             | URL path, headers, cookies, method, etc. |
| Content-aware?   | ❌ No                                 | ✅ Yes                                    |
| Speed            | ⚡ Faster                             | 🧠 Slightly slower (more logic involved)  |
| Use cases        | General load distribution, fast apps | Microservices, APIs, complex routing     |


----


## Questions
1. how to choose right load balancer
2. based on layer. layer 4 and layer 7 explain bit more on this
---
