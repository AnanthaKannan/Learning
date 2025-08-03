## Whats up system design
![alt text](image-18.png)

## Scenario Recap
1. User A sends a message.
2. Message goes through Load Balancer → Chat Server A.
3. User B is connected to a different server — Chat Server B.

Question: How does User B receive the message in real time if they're on a different server?



### Challenges
1. we using non sql db because we have some challenges on sql DB while scale it
1. if the chat server multiple, user_a connected to server_a and user_b connected to server_b then how the user_a message send to user_b as they are connected to different server. for that reason we are using redis, redis know which server connect to which user
2. user_a send a message and chat server get the detail user_b connection detail from redis and connected throw hash by server b and send the message
3. websocket is a single connection. if it connected it should not be disconnected.

how system hashing works