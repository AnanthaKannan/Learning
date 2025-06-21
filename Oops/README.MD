# Oops

## 🔑 Core OOP Concepts:
1. Classes and Objects
2. Encapsulation
3. Inheritance
4. Polymorphism
5. Abstraction
6. Access Modifiers (public, private, protected)
7. Interfaces vs. Abstract Classes

## Classes and Objects
✅ What is a Class?
A class is a blueprint for creating objects with predefined properties and methods.
<br>
✅ What is an Object?
An object is an instance of a class, with actual values assigned to the properties.

```ts
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
  }
}

// Creating objects
const person1 = new Person('Alice', 30);
person1.greet(); // Output: Hello, my name is Alice and I'm 30 years old.

```

## What is Encapsulation?
Encapsulation is the concept of hiding internal details of an object and only exposing what is necessary. This helps protect data from unauthorized access and keeps the code modular and maintainable. <br>

In TypeScript, we use access modifiers to achieve encapsulation:

| Modifier    | Access Level                                    |
| ----------- | ----------------------------------------------- |
| `public`    | Accessible from anywhere                        |
| `private`   | Accessible only inside the class                |
| `protected` | Accessible in the class and its subclasses only |

```ts
class BankAccount {
  private balance: number;

  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }

  // Public method to access the private property
  public getBalance(): number {
    return this.balance;
  }

  public deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
    }
  }

  public withdraw(amount: number): void {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
    }
  }
}

const account = new BankAccount(1000);
account.deposit(500);
account.withdraw(200);

console.log(account.getBalance()); // ✅ Output: 1300
// console.log(account.balance); ❌ Error: Property 'balance' is private

```
🧠 Why Encapsulation?
Prevents direct modification of important data.

Helps enforce rules (e.g., can't deposit negative money).

Improves code security and maintainability.

## 🧬 What is Inheritance?

Inheritance allows a class to inherit properties and methods from another class. It promotes code reusability and logical hierarchy.

| Keyword     | Purpose                                     |
| ----------- | ------------------------------------------- |
| `extends`   | Inherit from another class                  |
| `super()`   | Call the constructor of the parent class    |
| `protected` | Accessible in both base and derived classes |

```ts
class Parent {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  greet() {
    console.log(`Hello, I am ${this.name}`);
  }

  makeSound() {
    console.log('Some generic sound')
  }
}

// Child class using 'extends'
class Child extends Parent {
  constructor(name: string) {
    super(name); // Calls parent constructor
  }

  sayHi() {
    console.log(`Hi! I'm ${this.name}, your child.`);
  }
  // override the parent class
  makeSound() {
    console.log('Some generic sound')
  }
}

const child1 = new Child("Jeswanth");
child1.greet();  // Inherited from Parent
child1.sayHi();  // Own method

```

## What is Polymorphism?
Polymorphism means "many forms" — in OOP, it allows a single method to behave differently based on the object calling it. <br>

In TypeScript, polymorphism usually happens through: <br>
1. Method Overriding (inherited classes)
2. Interfaces or Abstract Classes

✅ Benefits of Polymorphism: <br>
1. Clean, extensible code
2. Easy to add new behaviors without changing existing logic
3. Supports open/closed principle (open for extension, closed for modification)



```ts
// Method Overriding (Runtime Polymorphism)
class Animal {
  makeSound(): void {
    console.log("Some generic animal sound");
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log("Woof!");
  }
}

class Cat extends Animal {
  makeSound(): void {
    console.log("Meow!");
  }
}

// Polymorphism in action
const animals: Animal[] = [new Dog(), new Cat(), new Animal()];

for (const animal of animals) {
  animal.makeSound(); // Different output for each object
}

```
Even though each item in the animals array is typed as Animal, the actual method that gets called depends on the object's real class


## Interfaces vs Abstract Classes in TypeScript
| Feature                  | Interface                               | Abstract Class                              |
| ------------------------ | --------------------------------------- | ------------------------------------------- |
| **Purpose**              | Define a **contract** for a class       | Provide a **base** with some implementation |
| **Implementation**       | ❌ No implementation (only declarations) | ✅ Can have method implementations           |
| **Constructor**          | ❌ Not allowed                           | ✅ Can have a constructor                    |
| **Multiple inheritance** | ✅ A class can implement multiple        | ❌ A class can only extend one               |
| **Fields (properties)**  | ✅ Only declarations                     | ✅ Can have initialized fields               |
| **Instantiable?**        | ❌ Cannot be instantiated                | ❌ Cannot be instantiated                    |
| **Usage**                | To define structure/shape               | To define partial implementation + contract |

### using interface
```ts
interface Animal {
  name: string;
  makeSound(): void;
}

class Dog implements Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  makeSound(): encapsulated  {
    console.log("Woof!");
  }
}

```

### using abstract class
```ts
abstract class Animal {
  constructor(protected name: string) {}

  abstract makeSound(): void;

  move(): void {
    console.log(`${this.name} is moving`);
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log("Woof!");
  }
}

const dog = new Dog("Bruno");
dog.makeSound(); // Woof!
dog.move();      // Bruno is moving

```