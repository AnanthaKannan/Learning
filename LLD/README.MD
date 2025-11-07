## LLD
[GIT LINK](https://github.com/prateek27/design-patterns-java)

| Name             | Age | Description                                            |
| ---------------- | --- | ------------------------------------------------------ |
| Command Pattern  | 30  | Engineer                                               |
| Memento Pattern  | 25  | Designer                                               |
| Observer Pattern | 28  | Weather station going to notify in to multiple devices |
| Strategy Pattern | 20  | Bank transaction with multiple credit card             |



## What is the use of static methods in a class?
Static methods belong to the class itself rather than to any specific instance of the class. They can be called without creating an instance of the class.
## What is the use of abstract class?
* In TypeScript, an abstract class is a special kind of class that cannot be instantiated directly — you can’t create an object from it.
* Define a common structure that multiple subclasses can share.
* Enforce a contract — i.e., ensure all subclasses implement certain methods.
```ts
abstract class Animal {
  // Abstract method (must be implemented by subclasses)
  abstract makeSound(): void;

  // Concrete method (shared logic)
  move(): void {
    console.log("Moving...");
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log("Woof! 🐶");
  }
}

class Cat extends Animal {
  makeSound(): void {
    console.log("Meow! 🐱");
  }
}

const dog = new Dog();
dog.makeSound(); // Output: Woof! 🐶
dog.move();      // Output: Moving...

// const animal = new Animal(); ❌ Error: Cannot create an instance of an abstract class
```
## What is Polymorphism?
Polymorphism is a core concept in object-oriented programming that allows objects of different classes to be treated as objects of a common superclass. It enables a single interface to represent different underlying forms (data types). The most common use of polymorphism is when a parent class reference is used to refer to a child class object.
```ts
class Animal {
  makeSound(): void {
    console.log("Some generic animal sound");
  }
}
class Dog extends Animal {
  makeSound(): void {
    console.log("Woof! 🐶");
  }
}
class Cat extends Animal {
  makeSound(): void {
    console.log("Meow! 🐱");
  }
}

function playSound(animal: Animal): void {
  animal.makeSound();
}

const myDog = new Dog();
const myCat = new Cat();
playSound(myDog); // Output: Woof! 🐶
playSound(myCat); // Output: Meow! 🐱
```

## create enum in typescript
```ts
enum Direction {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT"
}
```

## Projects

1. URL Shortener – your starting idea ✅
2. Parking Lot System – car entry, ticket, and payment ✅
3. Library Management System – books, users, checkout, return ✅
4. Vending Machine – coin insert, product selection, change
5. Elevator System – multiple elevators, request handling
6. Snake and Ladder Game – game board design and turn management
7. Tic-Tac-Toe Game – multiplayer design
8. Online Movie Ticket Booking – seats, shows, and reservations
9. ATM Machine – withdrawals, deposits, and transaction history
10. Inventory Management System – items, stock updates, and categories
11. Splitwise – expense sharing between friends
12. Logging Framework – different log levels and outputs
13. Notification Service – email/SMS/push notifications
14. Rate Limiter – per-user or per-IP throttling
15. Cache System – simple in-memory LRU cache
16. Food Delivery System (like Swiggy/Zomato)
17. Ride Sharing App (like Uber/Ola)
18. Hotel Booking System (like OYO)
19. Payment Gateway – transaction flow, retries, status management
20. Online Whiteboard Collaboration
21. File Storage Service (like Google Drive)
22. Job Scheduler / Cron System
23. Online Auction System
24. Social Media Feed (like Twitter)
25. E-commerce Cart System
26. Online Learning Platform (like Udemy)
27. Stock Trading System (order book design)
28. Online Chat App (like WhatsApp)
29. Document Version Control (like Google Docs)
30. Content Recommendation Engine
31. Task Management App (like Trello)
32. Digital Wallet (like Paytm)
33. Gaming Leaderboard Service
34. Subscription Billing System (like Netflix)
35. Geo-location Tracker Service
36. Distributed Cache (like Redis)
37. Message Queue System (like Kafka/RabbitMQ)
38. Search Engine (like Elasticsearch)
39. Video Streaming Service (like YouTube)
40. Cloud Storage Service (like AWS S3)
41. API Gateway / Load Balancer
42. Distributed Lock Manager
43. Real-time Notification System (Pub/Sub)
44. Analytics Dashboard (event-based data aggregation)
45. Monitoring & Alerting System (like Prometheus)
46. Collaborative Document Editor (Google Docs-style)
47. Email Service Provider (like SendGrid)
48. CI/CD Pipeline System (like GitHub Actions)
49. IoT Device Manager (AWS IoT-like)
50. Microservices Orchestration (like Kubernetes control plane)