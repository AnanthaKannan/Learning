## Chain calculator

```js
class ChainCal {
  constructor(value = 0) {
    this.value = value;
  }

  add(value) {
    this.value = this.value + value;
    return this;
  }

  sub(value) {
    this.value = this.value - value;
    return this;
  }

  div(value) {
    this.value = this.value - value;
  }

  getResult() {
    return this.value;
  }
}

const chainCal = new ChainCal(10);
const result = chainCal.add(10).sub(1).getResult();
console.log("result", result);
```

## Pipe and Compose in JavaScript

Both pipe and compose are functional programming techniques used to execute multiple functions in sequence.<br>

1. Pipe (Left to Right Execution) <br><br>
   In pipe, functions execute from left to right, where each function takes the output of the previous function as input.

```js
const pipe =
  (...fns) =>
  (value) =>
    fns.reduce((acc, fn) => fn(acc), value);

// Example functions
const add2 = (x) => x + 2;
const multiply3 = (x) => x * 3;
const subtract5 = (x) => x - 5;

// Create a pipeline
const pipedFunction = pipe(add2, multiply3, subtract5);

console.log(pipedFunction(5)); // Output: (5 + 2) * 3 - 5 = 16
```

2. Compose (Right to Left Execution) <br><br>
   In compose, functions execute from right to left, meaning the last function runs first.

```js
const compose =
  (...fns) =>
  (value) =>
    fns.reduceRight((acc, fn) => fn(acc), value);

// Create a composed function
const composedFunction = compose(subtract5, multiply3, add2);

console.log(composedFunction(5)); // Output: (5 * 3) + 2 - 5 = 12
```
