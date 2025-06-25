// Step 1: Define a common interface
interface Notification {
  send(message: string): void;
}

// Step 2: Create concrete classes that implement the interface
class EmailNotification implements Notification {
  send(message: string): void {
    console.log(`Sending EMAIL: ${message}`);
  }
}

class SMSNotification implements Notification {
  send(message: string): void {
    console.log(`Sending SMS: ${message}`);
  }
}

class PushNotification implements Notification {
  send(message: string): void {
    console.log(`Sending PUSH notification: ${message}`);
  }
}

// Step 3: Create the Factory
class NotificationFactory {
  static createNotification(type: string): Notification {
    switch (type.toLowerCase()) {
      case 'email':
        return new EmailNotification();
      case 'sms':
        return new SMSNotification();
      case 'push':
        return new PushNotification();
      default:
        throw new Error('Invalid notification type');
    }
  }
}

// Step 4: Use the factory
const notificationType = 'email';
const notifier = NotificationFactory.createNotification(notificationType);
notifier.send('This is a factory pattern example!');
