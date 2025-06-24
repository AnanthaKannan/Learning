### #variable (private variable) in class on js

```js
class Car {
  #speed = 0; // private variable

  setSpeed(value) {
    this.#speed = value;
  }

  getSpeed() {
    return this.#speed;
  }
}

const myCar = new Car();
myCar.setSpeed(100);
console.log(myCar.getSpeed()); // 100
console.log(myCar.#speed); // ❌ SyntaxError: Private field '#speed' must be declared in an enclosing class
```

## what is get method in class

- The get keyword defines a getter method for a property.
- The getter method does not accept parameters.
- When accessing the property, the getter method is executed.

```js
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  get area() {
    return this.width * this.height;
  }
}

const rect = new Rectangle(10, 5);
console.log(rect.area); // 50
```

Why Use Getters?

- Encapsulation: Control access to properties.
- Computed Properties: Return a calculated value based on other properties.
- Data Validation: Ensure the data meets specific conditions before returning it.

---

## what is set method in class

The set method in JavaScript classes is a special method that allows you to define a setter function for a property. It is used to execute logic whenever a specified property is assigned a value.

- The set method must accept exactly one parameter, which represents the value being assigned.

```js
class Rectangle {
  constructor(width, height) {
    this._width = width;
    this._height = height;
  }

  get width() {
    return this._width;
  }

  set width(value) {
    if (value <= 0) {
      console.log("Width must be positive.");
    } else {
      this._width = value;
    }
  }
}

const rect = new Rectangle(10, 5);
console.log(rect.width); // 10

rect.width = 20;
console.log(rect.width); // 20

rect.width = -5; // "Width must be positive."
console.log(rect.width); // 20
```

why use setters

- Data Validation: Ensure that only valid data is assigned to a property.
- Encapsulation: Control how properties are modified, preventing accidental changes.
- Computed Properties: Update related properties or perform side effects when a property is modified.

---

## Static Method

The static keyword in JavaScript is used to define static methods and properties that belong to the class itself, rather than to instances of the class.

```js
class MathOperations {
  static add(a, b) {
    return a + b;
  }
}

console.log(MathOperations.add(5, 3)); // 8

const math = new MathOperations();
// math.add(5, 3);  // ❌ Error: add is not a function
```

## Define constant values that are shared across all instances in class

```js
class AppConfig {
  static appName = "My Application";
  static version = "1.0.0";
}

console.log(AppConfig.appName); // "My Application"
```

## static
```js
class Test {
  public stree: string = 'xyz'

  public static fn(): void {
    this.stree = 'aa' // not allowed
  }
}
```

stree is an instance property:
Declared with public stree: string = 'xyz';
This property belongs to instances of the class (new Test()), not the class itself.
fn() is a static method:
Declared with static, so it belongs to the class Test, not to instances of it.
Inside a static method, this refers to the class (Test), not to an instance of it.
Problem:
this.stree = 'aa' inside static fn() is trying to assign to Test.stree.
But stree is not a static property — it's an instance property.
TypeScript throws an error like:
