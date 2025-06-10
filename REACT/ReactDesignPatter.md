## 1. Container and Presentational Pattern

- Container: Handles the logic (fetch data, state).
- Presentational: Only focuses on UI (dumb components).

```js
// Presentational
const UserProfile = ({ user }) => <div>{user.name}</div>;

// Container
const UserContainer = () => {
  const user = { name: "John" };
  return <UserProfile user={user} />;
};
```

Why? → Separates logic from UI. Cleaner.

## 2. Higher-Order Components (HOC)

A function that takes a component and returns a new component.

```js
function withLogger(WrappedComponent) {
  return function (props) {
    console.log("Props:", props);
    return <WrappedComponent {...props} />;
  };
}
```

Why? → Reuse logic (like authentication, logging).

## 3. Hooks Pattern (Modern way after React 16.8)

You extract logic into custom hooks.

```js
function useCounter(initialValue = 0) {
  const [count, setCount] = React.useState(initialValue);
  const increment = () => setCount(count + 1);
  return { count, increment };
}

// Usage in component
const Counter = () => {
  const { count, increment } = useCounter();
  return <button onClick={increment}>Count: {count}</button>;
};
```

## 4. Compound Components

Components that work together and share internal state.

```js
const Tabs = ({ children }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  return (
    <div>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          isActive: index === activeIndex,
          onActivate: () => setActiveIndex(index),
        })
      )}
    </div>
  );
};

const Tab = ({ isActive, onActivate, children }) => (
  <button
    onClick={onActivate}
    style={{ fontWeight: isActive ? "bold" : "normal" }}
  >
    {children}
  </button>
);

// Usage
<Tabs>
  <Tab>Tab 1</Tab>
  <Tab>Tab 2</Tab>
</Tabs>;
```

---

✅ State Lifting in React

## ✅ State Lifting in React

```js
import { useState } from "react";

function ChildA({ onInputChange }) {
  return (
    <div>
      <input onChange={(e) => onInputChange(e.target.value)} />
    </div>
  );
}

function ChildB({ data }) {
  return <div>Data from ChildA: {data}</div>;
}

function App() {
  const [sharedData, setSharedData] = useState("");

  return (
    <div>
      <ChildA onInputChange={setSharedData} />
      <ChildB data={sharedData} />
    </div>
  );
}

export default App;
```

# Node design pattern

## 1. Module Pattern

Node.js uses CommonJS modules (require, module.exports) to organize code into files.

Each file has its own private scope.

```js
// userService.js
const getUser = () => ({ name: "John" });

module.exports = { getUser };
```

Why? → Separation of concerns. Reuse. Private variables.

## 2. Singleton Pattern

Only one instance of an object is created across the app.

```js
// dbConnection.js
let instance = null;

class DBConnection {
  constructor() {
    if (!instance) {
      instance = this;
      // initialize connection
    }
    return instance;
  }
}

module.exports = new DBConnection();
```

Why? → Keep a single database connection alive.

### 3. Factory Pattern

A function creates and returns different objects depending on parameters.

```js
function CarFactory(type) {
  if (type === "sedan") return { type: "sedan", doors: 4 };
  if (type === "truck") return { type: "truck", doors: 2 };
}

const sedan = CarFactory("sedan");
```

Why? → Dynamic object creation.

### 4. Middleware Pattern (especially with Express.js)

Chain of functions that process a request step-by-step.

```js
app.use((req, res, next) => {
  console.log("Middleware 1");
  next();
});

app.use((req, res, next) => {
  console.log("Middleware 2");
  next();
});
```

Why? → Split request handling into manageable pieces.

### 5. Decorator Pattern

Add additional behavior to an object without changing its structure.

```js
function addTimestamp(fn) {
  return function (...args) {
    console.log("Time:", new Date());
    return fn(...args);
  };
}

const sayHello = (name) => console.log(`Hello, ${name}`);
const timedHello = addTimestamp(sayHello);

timedHello("Bob");
```

Why? → Dynamically extend functionality.

### 8. Adapter Pattern

Convert one interface into another one expected by the client.

```js
class OldPrinter {
  print() {
    console.log("Printing from old printer...");
  }
}

class NewPrinter {
  newPrint() {
    console.log("Printing from new printer...");
  }
}

// Adapter
class PrinterAdapter {
  constructor(printer) {
    this.printer = printer;
  }
  print() {
    this.printer.newPrint();
  }
}

const printer = new PrinterAdapter(new NewPrinter());
printer.print();
```

Why? → Make incompatible systems work together.
