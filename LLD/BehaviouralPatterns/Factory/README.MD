# Factory


1. Interface (Notification): Guarantees each notification type has a send method.
2. Concrete classes (EmailNotification, etc.): Implement that interface in their own way.
3. Factory (NotificationFactory): Centralizes creation logic and returns the correct instance.
4. Client code: Only deals with the interface and the factory, not the actual class names.

