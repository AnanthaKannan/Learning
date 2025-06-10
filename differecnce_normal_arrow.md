# 🚀 Difference Between Arrow Function and Normal Function in JavaScript

## **1️⃣ Syntax Difference**

### **Arrow Function**

```js
const add = (a, b) => a + b;
console.log(add(5, 3)); // 8

function add(a, b) {
  return a + b;
}
console.log(add(5, 3)); // 8
```

2️⃣ this Behavior (Major Difference) <br>

```js
// Normal Function (this is dynamic)

const person = {
  name: "John",
  greet: function () {
    console.log(`Hello, ${this.name}`);
  },
};
person.greet(); // "Hello, John"

// Arrow Function (this is lexically bound)

const person = {
  name: "John",
  greet: () => {
    console.log(`Hello, ${this.name}`);
  },
};
person.greet(); // "Hello, undefined"
```

3️⃣ arguments Object

```js
// Normal Functions have arguments
function printArgs() {
  console.log(arguments);
}
printArgs(1, 2, 3); // [1, 2, 3]

// Arrow Functions don’t have arguments

const printArgs = () => {
  console.log(arguments);
};
printArgs(1, 2, 3); // ❌ ERROR: arguments is not defined
```

4️⃣ new Keyword (Constructor Function)

```js
// Normal Functions can be used as constructors
function Person(name) {
  this.name = name;
}
const p = new Person("John");
console.log(p.name); // "John"


Arrow Functions Cannot be Constructors
const Person = (name) => {
  this.name = name;
};
const p = new Person("John"); // ❌ ERROR: Person is not a constructor

```

5️⃣ Implicit Return

```js
// Arrow Functions allow implicit return
const square = (x) => x * x;
console.log(square(4)); // 16

// Normal Functions require return explicitly

function square(x) {
  return x * x;
}
console.log(square(4)); // 16
```
