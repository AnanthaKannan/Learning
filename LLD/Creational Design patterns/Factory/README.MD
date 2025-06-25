# Factory

* What is the main purpose of the Factory design pattern? <br>
To provide an interface for creating objects without specifying the exact class

* In a Factory pattern, which of the following is responsible for deciding which class to instantiate? <br>
The factory class is responsible for determining which concrete class to instantiate, hiding the instantiation logic from the client and allowing for flexible object creation.

* The Factory pattern is ideal for situations like database connection management, where different concrete classes (e.g., MySQL, PostgreSQL) can be instantiated based on configuration or runtime conditions.

1. Interface (Notification): Guarantees each notification type has a send method.
2. Concrete classes (EmailNotification, etc.): Implement that interface in their own way.
3. Factory (NotificationFactory): Centralizes creation logic and returns the correct instance.
4. Client code: Only deals with the interface and the factory, not the actual class names.

