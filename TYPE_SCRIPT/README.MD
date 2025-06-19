## TYPE SCRIPT
```js
npm install -g typescript
tsc --version
```
### Compile TypeScript to JavaScript
```js
tsc file.ts
tsc file.ts --watch // automatically compile on changes
tsc file.ts --outDir dist // specify output directory
```
### TypeScript Configuration
```js
tsc --init // create tsconfig.json
```

## Functions
```js
function add(a: number, b: number): number {
  return a + b;
}
function greet(name?: string): void {
  console.log(`Hello, ${name}!`);
}
function getUserInfo(id: number): { name: string; age: number } {
  return { name: "John", age: 30 };
}
```

### Objects and Arrays
```js
let user: { name: string; age: number } = {
  name: "Alice",
  age: 25,
};

let numbers: number[] = [1, 2, 3, 4, 5];
let mixedArray: (string | number)[] = ["Alice", 25, "Bob", 30]; // union type

const count: Record<string, number> = {};
count['string'] = 10
```

### Types Alias and Interfaces
```js
type User = {
  name: string;
  age: number;
};
interface Product {
  id: number;
  name: string;
  price: number;
}
let user1: User = { name: "Alice", age: 25 };
let product: Product = { id: 1, name: "Laptop", price: 999.99 };
```

### Enums
```js
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}
let move: Direction = Direction.Up;
console.log(move); // "UP"
```

### Function signatures
```js
// example 1
type AddFunction = (a: number, b: number) => number;
function addNumbers: AddFunction = (a, b) => {
  return a + b;
};

// example 2

let multiply: (x: number, y: number) => number;
multiply = function (x, y) {
  return x * y;
};
``` 

### Classes
```js
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(): void {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
}
let person1 = new Person("Alice", 30);
let person2 = new Person("Bob", 28);

const persons: Person[] = [person1, person2];
```

### Public, Private, and Protected
```js
class Animal {
  public name: string;
  private age: number;
  protected species: string;

  constructor(name: string, age: number, species: string) {
    this.name = name;
    this.age = age;
    this.species = species;
  }

  public getInfo(): string {
    return `${this.name} is a ${this.species} and is ${this.age} years old.`;
  }
}

class Dog extends Animal {
  constructor(name: string, age: number) {
    super(name, age, "Dog");
  }

  public bark(): void {
    console.log(`${this.name} says Woof!`);
  }
}
class Cat extends Animal {
  constructor(name: string, age: number) {
    super(name, age, "Cat");
  }

  public meow(): void {
    console.log(`${this.name} says Meow!`);
  }
}
const dog = new Dog("Buddy", 5);
const cat = new Cat("Whiskers", 3);
console.log(dog.getInfo()); // Buddy is a Dog and is 5 years old.
console.log(cat.getInfo()); // Whiskers is a Cat and is 3 years old.
dog.bark(); // Buddy says Woof!
cat.meow(); // Whiskers says Meow!
```