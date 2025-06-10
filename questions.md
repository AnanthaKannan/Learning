1. I have a lot of list, want to show in the drop down, how we can show in the efficient way

```text
react-window is a library that helps efficiently render large lists by virtualizing them, meaning it only renders items that are visible in the viewport. This improves performance, especially when dealing with thousands of rows
```

```js
import React from "react";
import { FixedSizeList as List } from "react-window";

function TestComp() {
  const Row = ({ index, style }) => <div style={style}>Row {index}</div>;

  return (
    <div>
      <List
        height={400} // Total height of the list container
        width={300} // Total width of the list container
        itemSize={35} // Height of each row
        itemCount={1000} // Total number of rows
      >
        {Row}
      </List>
    </div>
  );
}

export default TestComp;
```

---

2. what is the output of that

```js
const add = (x) => x + x;

function myFunc(num = 2, value = add(num)) {
  console.log(num, value);
}

myFunc(); // 2 4
myFunc(3); // 3 6
```

JavaScript evaluates parameters in order (left to right). Since num is initialized first, value can safely use num in its default assignment.

---

3. 🔥 Why is Unidirectional Flow Better?
   unidirectional means, react allow send a data from parent to child <br>
   ✅ Predictable State Changes – Easy to track data updates.<br>
   ✅ Easier Debugging – No unexpected UI changes.<br>
   ✅ Better Performance – React updates only necessary components.<br>
   ✅ Encourages Component Reusability – Since child components don’t modify parent data directly.<br>

4. How Virtual DOM Works:
   **Render & Create VDOM**: When a React component's state or props change, React creates a new Virtual DOM tree.
   <br><br>
   **Diffing (Comparison)**: React compares the new Virtual DOM tree with the previous one to find the differences (using a process called Reconciliation).
   <br><br>
   **Efficient Updates**: Instead of updating the entire real DOM, React updates only the changed elements in the real DOM, making updates faster.
   <br><br>

   🔹 **Advantages of Virtual DOM**: <br>
   ✅ Performance Optimization: Minimizes direct DOM manipulations, which are slow.
   <br>
   ✅ Efficient Updates: Uses a diffing algorithm to update only necessary parts.
   <br>
   ✅ Smooth UI Experience: Prevents unnecessary re-rendering and ensures a better user experience. <br>

5. what is the different between element and component

🔹 Example of a React Element

```js
const element = <h1>Hello, World!</h1>;
console.log(element);
```

🔹Example of a React Component

```js
function Greeting() {
  return <h1>Hello, World!</h1>;
}
```

6. When to use a Class Component over a Function Component? <br>
   t is always recommended to use
   Function components, unless you need a React functionality whose Function
   component equivalent is not present yet, like Error Boundaries

7. Pure Components in React <br>
   A Pure Component in React is a component that only re-renders when its state or props change. It automatically implements shouldComponentUpdate() to optimize performance by preventing unnecessary re-renders. <br>

🔹 Key Features of Pure Components <br>
✅ Automatic Re-render Prevention – If props and state are the same as the previous render, it won't re-render.<br>
✅ Shallow Comparison – React performs a shallow comparison (i.e., it checks if the references of props or state have changed).<br>
✅ Improved Performance – Reduces unnecessary renders, making apps faster.<br>

```js
import React, { PureComponent } from "react";

class PureCounter extends PureComponent {
  render() {
    console.log("Pure Component Rendered");
    return <h2>Count: {this.props.count}</h2>;
  }
}

export default PureCounter;
```

```js
const MemoizedCounter = React.memo(({ count }) => {
  console.log("Memoized Component Rendered");
  return <h2>Count: {count}</h2>;
});

export default MemoizedCounter;
```

8. What are synthetic events in React?
   <br>
   React event = onClick, onChange, onMouseEnter, onMouseLeave<br>
   Native event = onclick, onchange, mouseenter, mouseleave
   <br><br>
   React wraps the native browser events inside its own event system (SyntheticEvent) to ensure:<br>
   ✔️ Cross-browser consistency<br>
   ✔️ Performance optimization (Event Pooling)<br>
   ✔️ A unified API across different browsers<br>

9.What are forward refs? <br>
Usually form parent to child not allowed to send ref. if we need to send than we have to use forwardRef <br>
`forwardRef` takes a two params as `props` and `ref`

```js
import React, { useRef, forwardRef } from "react";

// ✅ Correct way: Use forwardRef to pass the ref
const InputComponent = forwardRef((props, ref) => {
  return <input ref={ref} type="text" />;
});

function TestComp() {
  const inputRef = useRef();

  return (
    <div>
      <InputComponent ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Focus Input</button>
    </div>
  );
}

export default TestComp;
```

10. Higher order component <br>

Use HOCs when you need to reuse logic across multiple components.
For example:<br>

Authentication Handling<br>
Logging or Analytics<br>
Theming<br>
Permissions & Role-Based Access<br>
Fetching Data (e.g., API calls in HOCs)<br>

```js
import React from "react";

const SimpleComponent = ({ name }) => {
  return <h1>Simple component {name}</h1>;
};

const withBorder = (WrappedComponent) => {
  return (props) => (
    <div style={{ border: "2px solid red", padding: "10px" }}>
      <WrappedComponent {...props} />
    </div>
  );
};

function TestComp() {
  const EnhancedComponent = withBorder(SimpleComponent);

  return <EnhancedComponent name="React Developer" />;
}

export default TestComp;
``;
```

12. Lazy loading <br>
    React allows you to lazy load components using React.lazy() and Suspense.
    <br>
    📌 Here, LazyComponent is dynamically loaded only when needed, reducing the initial bundle size.
    <br>
    Suspense is a built-in React component that allows you to handle asynchronous operations gracefully. It is mainly used for lazy loading components and handling async data fetching.

<br>

```js
import { Suspense, lazy } from "react";
import React from "react";
const DashboardComp = lazy(() => import("./component/DashboardComp"));

function TestComp() {
  return (
    <Router>
      <Routes>
        <Route
          path="home"
          element={<Suspense fallback="Loading....">{DashboardComp}</Suspense>}
        />
      </Routes>
    </Router>
  );
}

export default TestComp;
```

---

## Call, Apply, Bind

call(thisArg, arg1, arg2, ...) - Calls the function immediately <br>
apply(thisArg, [arg1, agr2]) - Calls the function immediately <br>
bind(thisArg, arg1, arg2, ...) - Does not call immediately, returns a new function <br>

```js
function greet(message) {
  console.log(`${message}, ${this.name}`);
}

const person = { name: "Alice" };

greet.call(person, "Hello"); // Output: "Hello, Alice"
// -----------------------------------------------
function greet(message, timeOfDay) {
  console.log(`${message}, ${this.name}. Good ${timeOfDay}!`);
}

const person = { name: "Alice" };

greet.apply(person, ["Hello", "morning"]); // Output: "Hello, Alice. Good morning!"
// --------------------------------------------------------
function greet(message) {
  console.log(`${message}, ${this.name}`);
}

const person = { name: "Alice" };
const greetAlice = greet.bind(person);

greetAlice("Hello"); // Output: "Hello, Alice"
```

---

## Lexical Scope vs. Closure <br>

**Lexical Scope**: The concept that inner functions can access variables from their outer scope. <br>
**Closure**: A function that "remembers" variables from its outer scope even after the outer function has finished executing. <br>

```js
// outerFn is defined. It creates a variable 'outerValue' and returns an inner function.
const outerFn = () => {
  const outerValue = "sree"; // 'outerValue' is in the lexical scope of outerFn.

  // This inner function forms a closure over 'outerValue'.
  return () => {
    console.log("outerValue", outerValue); // Accessing 'outerValue' due to closure
  };
};

// outerFn is called, and it returns the inner function.
const innerFn = outerFn();

// innerFn is now executed. Even though outerFn has finished execution,
// 'outerValue' is still accessible because innerFn has formed a closure over it.
innerFn(); // Output: >>>>>>>>>>>>>>>>>>> sree
```

---

Throttle in JavaScript <br>
Executes at regular intervals<br>
Calls are executed at fixed intervals <br>

```js
function throttle(func, interval) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      func.apply(this, args);
    }
  };
}

// Usage: Ensures scrolling event fires at most once every 500ms
const throttledScroll = throttle(() => console.log("Scrolling..."), 500);
window.addEventListener("scroll", throttledScroll);
```

---

## Difference Between package.json and package-lock.json

| Feature             | package.json                                                               | package-lock.json                                                         |
| ------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Purpose             | Lists dependencies, scripts, metadata, and configurations for the project. | Locks the exact versions of installed dependencies to ensure consistency. |
| Dependency Versions | Uses version ranges (^1.0.0, ~2.3.0, \*).                                  | Stores exact dependency versions (1.0.5, 2.3.1).                          |
| Human-Readable      | Yes, meant for developers to configure.                                    | Mostly auto-generated, not meant to be manually edited.                   |
| Generated By        | Created and maintained manually or via npm init and npm install --save.    | Automatically generated when npm install is run.                          |

---

### Error Boundaries in React

🔹 Error Boundaries are React components that catch JavaScript errors anywhere in the component tree and prevent the entire app from crashing. <br>
will not Works with async code (fetch, setTimeout)?

<br>
React error boundaries only catch errors during rendering, lifecycle methods, and constructors

```js
import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // It runs before rendering, and it’s static because it doesn’t have access to this.

  static getDerivedStateFromError(error) {
    console.log("error", error);
    return { hasError: true }; // Update state so the fallback UI is shown
  }

  componentDidCatch(error, info) {
    console.error("Error Caught by Error Boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong. Please try again later.</h2>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

// -----------------------
import ErrorBoundary from "./ErrorBoundary";
import BuggyComponent from "./BuggyComponent";

function App() {
  return (
    <div>
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>
    </div>
  );
}
```

---

### Cluster with router

- we can use PM2 npm module
- The cluster module in Node.js provides several advantages, especially for applications that handle a high volume of requests. Here’s why you should use it:

- Node.js runs on a single-threaded event loop, meaning it uses only one CPU core by default.
- The cluster module forks multiple worker processes, allowing you to take advantage of multi-core CPUs.
- This improves performance and scalability for applications under high load.
- Example: If your system has 8 CPU cores, the cluster module can create 8 workers, each handling requests in parallel.

```js
const cluster = require("cluster");
const cpus = require("os").cpus().length;
const express = require("express");

if (cluster.isPrimary) {
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }

  cluster.on("exit", () => {
    cluster.fork();
  });
} else {
  const app = express();
  app.get("/", (req, res) => {
    res.send(`Hello ${cluster.Worker.id}`);
  });

  app.listen(3000, () => {
    console.log("Server is running on");
  });
}
```

---

### createRef in React.js

createRef is a method in React that creates a reference to a DOM element or a React component. It is mostly used in class components to directly access the DOM.

```js
import React, { Component, createRef } from "react";

class MyComponent extends Component {
  constructor() {
    super();
    this.myRef = createRef(); // Creating a reference
  }

  componentDidMount() {
    console.log(this.myRef.current); // Logs the referenced DOM element
  }

  render() {
    return <div ref={this.myRef}>Hello, createRef!</div>;
  }
}
```

---

### Types of react router

| Router Type   | Use Case                                                               |
| ------------- | ---------------------------------------------------------------------- |
| BrowserRouter | Ideal for modern SPAs with clean URLs.                                 |
| HashRouter    | Useful when server configuration is not possible (e.g., GitHub Pages). |
| MemoryRouter  | Best for tests or React Native apps.                                   |
| StaticRouter  | Used for SSR applications (e.g., with Next.js or Express).             |

---

### 1️⃣ React.createElement

- When creating elements dynamically without JSX.
- Used internally by React when rendering JSX.

```js
import React from "react";

const element = React.createElement(
  "button",
  { onClick: () => alert("Clicked!") },
  "Click Me!"
);

console.log(element); // Outputs a React element
```

📌 Equivalent JSX:

```js
<button onClick={() => alert("Clicked!")}>Click Me!</button>
```

### 2️⃣ React.cloneElement

- Clones an existing React element and allows you to modify its props or children.

- Used when you want to pass additional props to an already created element.

```js
import React from "react";

const Button = (props) => <button {...props}>Click Me!</button>;

const originalElement = <Button onClick={() => alert("Original Clicked!")} />;

const clonedElement = React.cloneElement(originalElement, {
  onClick: () => alert("Cloned Clicked!"),
  style: { color: "red" },
});

console.log(clonedElement); // Outputs the cloned element with new props
```

## What is a Generator Function?

A generator function allows you to pause execution and resume it later. Instead of returning a single value, it can yield multiple values over time using the yield keyword.

```js
var fibGenerator = function* () {
  let a = 0,
    b = 1;
  while (true) {
    yield a; // Pause and return the current value
    [a, b] = [b, a + b]; // Update to the next Fibonacci numbers
  }
};

const gen = fibGenerator(); // Create generator instance

console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3
console.log(gen.next().value); // 5
```

## Cookies

using `js-cookie` moudule we can set and get cookies

```js
Cookies.set("username", "john_doe", { expires: 7 }); // expires in 7 days
const username = Cookies.get("username");
Cookies.remove("username");
```

for HTTP cookies

```js
res.cookie("token", "abc123", {
  httpOnly: true,
  secure: true, // Only send over HTTPS
  sameSite: "Strict", // CSRF protection
  maxAge: 3600000, // 1 hour
});
```

1. In this case:
2. The cookie is set by the server.
3. It will be stored in the browser, but
4. It won’t be accessible through `document.cookie` in JS.

Return back from UI

```js
fetch("https://yourdomain.com/api/user-data", {
  method: "GET",
  credentials: "include", // 👈 this is important!
});

// ---------------------------------

axios.get("/api/secure-data", { withCredentials: true });
```

Backend code

```js
// server.js
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser()); // middleware to parse cookies

app.use(express.json()); // for parsing JSON bodies

// Route to set a cookie
app.get("/set-cookie", (req, res) => {
  res.cookie("token", "abc123", {
    httpOnly: true,
    secure: false, // set to true in production with HTTPS
    sameSite: "Strict",
    maxAge: 3600000, // 1 hour
  });
  res.send("Cookie set!");
});

// Route to read cookie from request
app.get("/get-cookie", (req, res) => {
  const token = req.cookies.token;
  res.send(`Received token: ${token}`);
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

## Difference between === (Strict Equality) and == (Loose Equality)

| Expression        | == Result | === Result |
| ----------------- | --------- | ---------- |
| '5' === 5         | true      | false      |
| 0 == false        | true      | false      |
| null == undefined | true      | false      |
| '' == 0           | true      | true       |
| 5 == 5            | true      | true       |

## What is portals in react

In React, portals provide a way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.
<br>

### Why use portals?

Normally, React components render into a specific part of the DOM tree, usually under a root div (`<div id="root"></div>`). But sometimes you want to render elements outside of that tree—like modals, tooltips, or dropdowns that visually break out of their parent containers for styling or positioning purposes.

```js
import { createPortal } from "react-dom";

export default function MyComponent() {
  return (
    <div style={{ border: "2px solid black" }}>
      <p>This child is placed in the parent div.</p>
      {createPortal(
        <p>This child is placed in the document body.</p>,
        document.body
      )}
    </div>
  );
}
```

```html
<div id="root">
  <div style="border: 2px solid black;">
    <p>This child is placed in the parent div.</p>
  </div>
</div>
<p>This child is placed in the document body.</p>
```

---

## 🚨 What is React Strict Mode?

<React.StrictMode> is a wrapper component that activates additional checks and warnings for its children. It doesn’t render anything visible in the UI and it only affects development—it has no effect in production builds.

1. Detects unsafe lifecycle methods
   Like old ones that shouldn't be used in modern React (componentWillMount, etc.).
2. Warns about deprecated patterns
   Helps you future-proof your app.
3. Double-invokes certain functions (in development only)
   This includes useEffect, constructor, render, and more.
   <br>Why? To help you find bugs related to side effects or unexpected behavior.

4. Helps identify unexpected side effects
   If you're mutating state or causing issues in effects, this will expose it.

⚠️ Gotchas <br>

- You might see double console logs or effects firing twice in dev mode—that’s intentional.
  <br>
- It doesn’t break your code; it just gives early warnings to keep your codebase healthy.

---

## What is the orm used in postgresSql

- Sequelize

### what is prototype chain js

In JavaScript, the prototype chain is a mechanism that links objects together, allowing them to inherit properties and methods from each other.

Here’s the basic idea:

- Every JavaScript object has an internal link to another object called its prototype.

- That prototype object can also have its own prototype, and so on, forming a chain.

- When you try to access a property or method on an object, JavaScript first looks for that property on the object itself.
  If it doesn’t find it, it looks up the prototype chain until it finds it — or reaches the end (null).

## what is LRU in node js

LRU stands for `Least Recently Used`, which is a cache replacement algorithm. In Node.js, it’s commonly used to manage in-memory caches. The LRU algorithm prioritizes keeping the most recently used items in memory, evicting the least recently used items when the cache reaches its capacity.

- API Rate Limiting: Cache API results for a short period to avoid repeated requests.
- Session Storage: Cache user sessions or authentication tokens.
- Data Preprocessing: Cache the results of expensive database queries or computations.

```js
class LRUCache {
  constructor(maxSize) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }

  get(key) {
    if (!this.cache.has(key)) {
      return -1; // Cache miss
    }
    // Move to the end to mark it as recently used
    const value = this.cache.get(key);
    this.cache.delete(key); // Delete and reinsert
    this.cache.set(key, value);
    return value; // Cache hit
  }

  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key); // Delete the old value
    } else if (this.cache.size === this.maxSize) {
      // Remove the least recently used item (the first item in the Map)
      this.cache.delete(this.cache.keys().next().value);
    }
    // Insert the new key-value pair
    this.cache.set(key, value);
  }
}

const lru = new LRUCache(3);
lru.set("a", 1);
lru.set("b", 2);
lru.set("c", 3);
console.log(lru.get("a")); // 1 (cache hit)
lru.set("d", 4); // Evicts key 'b'
console.log(lru.get("b")); // -1 (cache miss)
```

## Modify req and res in single middleware

```js
const modifyMiddleware = (req, res, next) => {
  // Modify req object
  req.customData = { user: "John Doe", role: "admin" };

  // Modify res object
  res.setHeader("X-Custom-Header", "Modified by Middleware");

  // You can also add custom methods to res
  res.customSend = (message) => {
    res.send(`Custom Response: ${message}`);
  };

  next(); // Proceed to the next middleware or route
};

// Apply the middleware
app.use(modifyMiddleware);
```

## Scope Chain in JavaScript

1. JavaScript first looks for the variable in the current function scope. <br>
2. If not found, it moves up one level to the parent scope.<br>
3. This continues until it reaches the global scope.<br>
4. If the variable is not found, it results in a ReferenceError.<br>

---

## 🔥 Pure Functions in JavaScript

A Pure Function is a function that always produces the same output for the same input without modifying external state (no side effects).
<br>
it should return the response as well

```js
function add(a, b) {
  return a + b; // ✅ No external variables, always returns the same output for given inputs
}

console.log(add(2, 3)); // Output: 5
console.log(add(2, 3)); // Output: 5 (Same output for same input)
```

## 🚫 Impure Function Example

A Impure function that will not give the same out put if we are provide the same input. the response depends on some external state.

```js
let total = 0; // External state

function addToTotal(num) {
  total += num; // ❌ Modifies external variable
  return total;
}

console.log(addToTotal(5)); // Output: 5
console.log(addToTotal(5)); // Output: 10 ❌ (Different result for same input)
```

## Temporal Dead Zone (TDZ) in JavaScript

The Temporal Dead Zone (TDZ) refers to the period between when a let, const, or class variable is declared and when it is initialized. During this period, accessing the variable will result in a ReferenceError.

```js
console.log(a); // ReferenceError: Cannot access 'a' before initialization
let a = 10;
```

## Object.freeze() and Object.seal()

Object.freeze()

```js
const obj1 = {
  name: "Alice",
  age: 30,
  details: {
    age: 30,
    city: "New York",
  },
};

Object.freeze(obj1);

obj1.age = 35; // No effect
obj1.gender = "F"; // No effect
delete obj1.name; // No effect
obj.details.age = 35; // Allowed, inner object is not frozen
```

Object.seal()

```js
const obj2 = {
  name: "Bob",
  age: 25,
  details: {
    age: 30,
    city: "New York",
  },
};
Object.seal(obj2);

obj2.age = 28; // Allowed
obj2.gender = "M"; // Not allowed
delete obj2.name; // Not allowed
obj.details.age = 35; // Allowed, inner object is not frozen
```

- Use Object.freeze() when you want to make the object completely immutable.
- Use Object.seal() when you only want to prevent adding/removing properties but still allow modification of existing properties.

---

## IIFE

An Immediately Invoked Function Expression (IIFE) is a JavaScript function that runs as soon as it is defined. It is a design pattern used to create a new scope for variables, which helps in avoiding variable hoisting and polluting the global scope.

```js
(function () {
  var message = "Hello from IIFE";
  console.log(message); // Output: Hello from IIFE
})();
```

### Bundler Webpack

- Most widely used bundler for React applications.
- Allows you to bundle JavaScript, CSS, images, etc.
- Supports code splitting, lazy loading, hot module replacement (HMR), and more.
- Highly configurable using a webpack.config.js file.

```js
// webpack.config.js
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
```

## Transpilers

Transpilers are commonly used for several purposes:

1. Babel - Converts modern JavaScript (ES6+) to ES5 for browser compatibility Converts const and let to var
2. TypeScript Compiler (tsc) - Converts TypeScript to JavaScript
3. JSX Transpiler - Converts JSX (used in React) to JavaScript using Babel

- Backward Compatibility: Convert modern JavaScript (ES6+) to older versions (ES5) to ensure compatibility with older browsers.
- Language Features: Use new or experimental language features that are not yet widely supported.
- Syntax Conversion: Convert TypeScript or JSX to JavaScript.
- Optimization: Simplify or optimize code during the build process.

## Express security

1. Input Validation and Sanitization:

- Validate and sanitize user inputs to prevent malicious data (e.g., SQL injection, XSS).
- Use libraries like validator, joi, or express-validator.

2. Authentication and Authorization

- Implement proper authentication (e.g., JWT, OAuth).
- Apply role-based access control (RBAC) to restrict endpoint access.

3. HTTPS and Secure Headers:

- Enforce HTTPS using `helmet()` for setting secure headers.

4. Rate Limiting and Brute Force Protection:

- Use libraries like express-rate-limit to limit requests.

5. Prevent Cross-Site Scripting (XSS):

- Sanitize all user inputs and use libraries like xss-clean.

6. Cross-Site Request Forgery (CSRF) Protection:

- Implement CSRF protection using csurf middleware.

7. Content Security Policy (CSP):

- Define a CSP to control which resources can be loaded.

8. Error Handling and Logging:

- Do not expose sensitive error messages to the client.
- Use libraries like winston for logging errors and access logs.

9. Avoid Information Disclosure:

- Disable X-Powered-By header:

10. Secure Cookie Handling:

- Use `httpOnly`, `secure`, and `sameSite` attributes for cookies.

11. Data Encryption:

- Encrypt sensitive data before storing or transmitting.

12. Environment Variables Management:

- Use libraries like dotenv and avoid hardcoding secrets.

### Interceptors in JavaScript

In JavaScript, interceptors are functions or methods that allow you to intercept and manipulate requests or responses before they are sent or processed

- Adding Authorization Tokens: Intercepting requests to add authentication tokens (like JWTs).
- Global Error Handling: Catching and handling errors globally, such as network failures.
- Logging or Debugging: Intercepting to log or debug requests and responses.
- Request Modifications: Modifying request parameters or headers before sending.
- Response Modifications: Modifying response data before it's passed to the application.

```js
import axios from "axios";

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before the request is sent
    console.log("Request made with ", config);

    // Example: Add an Authorization header
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    // Handle request error
    return Promise.reject(error);
  }
);
```

```js
// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Do something with the response data
    console.log("Response received: ", response);

    // Example: Modify response data before passing it to the application
    response.data = response.data.results; // assume API returns results in a property

    return response;
  },
  function (error) {
    // Handle response error
    if (error.response.status === 401) {
      console.log("Unauthorized, logging out...");
      // Handle unauthorized access, e.g., redirect to login
    }
    return Promise.reject(error);
  }
);
```

### curring function

Currying is a technique in JavaScript where a function is transformed into a sequence of functions, each taking one argument and returning a function that takes the next argument, until all arguments are provided.

```js
// normal function
function multiply(a) {
  return function (b) {
    return function (c) {
      return a * b * c;
    };
  };
}

// arrow function
const multiply = (a) => (b) => (c) => a - b;

const result = multiply(2)(3)(4); // Output: 24
console.log(result);
```

### higher-order function

In JavaScript, a higher-order function is a function that either:

1. Takes one or more functions as arguments.
2. Returns a function as a result.

```js
// Example 1: Function that accepts another function as an argument

function greet(name, callback) {
  return callback(name);
}

function sayHello(name) {
  return `Hello, ${name}!`;
}

console.log(greet("Alice", sayHello)); // "Hello, Alice!"
```

```js
// Example 2: Function that returns another function
function multiplier(factor) {
  return function (number) {
    return number * factor;
  };
}

const double = multiplier(2);
console.log(double(5)); // 10

const triple = multiplier(3);
console.log(triple(5)); // 15
```

## Prototype Inheritance in JavaScript

In JavaScript, prototype inheritance is a feature that allows an object to inherit properties and methods from another object. This is achieved through the prototype property.

```js
// Parent object
const person = {
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  },
};

// Child object
const john = {
  name: "John",
};

// Setting person as the prototype of john
// Object.setPrototypeOf() modifies an existing object’s prototype.
Object.setPrototypeOf(john, person);

// Accessing the greet method through prototype inheritance
john.greet(); // Output: Hello, my name is John

// #################################################################################################

// Parent object
const person = {
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  },
};

// Creating a new object with person as its prototype
// Object.create() creates a new object with the specified prototype.
const john = Object.create(person);
john.name = "John";

// Accessing the greet method through prototype inheritance
john.greet(); // Output: Hello, my name is John
```

## Prototype Chain:

Every JavaScript object has an internal property called [[Prototype]]. When you access a property on an object,
JavaScript will first look for that property on the object itself. If it does not find it, it will look for the property in the object's prototype chain.

```js
console.log(john.__proto__); // { greet: [Function: greet] }
console.log(john.__proto__.__proto__); // Object prototype
console.log(john.__proto__.__proto__.__proto__); // null
```

## difference between common js and ESM

| Aspect         | CommonJS (CJS)                                    | ES Modules (ESM)                           |
| -------------- | ------------------------------------------------- | ------------------------------------------ |
| Syntax         | require() and module.exports                      | import and export                          |
| Context        | CommonJS modules run in their own function scope. | ESM modules run in strict mode by default. |
| File Extension | .js                                               | .mjs or .js (with "type": "module")        |
| Compatibility  | Node.js native                                    | Node.js, modern browsers, and build tools  |

## DDoS (Distributed Denial of Service) in Node.js

A DDoS attack occurs when multiple systems flood the target server with an overwhelming volume of requests, causing it to slow down or crash. Node.js, being single-threaded and event-driven, can be particularly vulnerable to DDoS attacks if not properly protected.

✅ 1. How DDoS Attacks Exploit Node.js

- CPU Exhaustion: Attackers send complex requests to consume server resources.
- Memory Exhaustion: Large payloads are sent to consume memory.
- Event Loop Blocking: Malicious requests execute long-running tasks, blocking other requests.
- Request Flooding: A high number of requests are sent to overwhelm the server.

<br>
Rate limiting restricts the number of requests a client can make within a specific time frame. Install `express-rate-limit`
<br>

```js
// This will limit each IP to 100 requests per minute.

// server.js
const express = require("express");
const rateLimit = require("express-rate-limit");

const app = express();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

app.use(limiter);
// Request Size Limiting
app.use(express.json({ limit: "10kb" })); // Limit request body to 10KB

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

CORS Restriction:

```js
const cors = require("cors");

app.use(
  cors({
    origin: ["https://trusted-domain.com"],
  })
);
```

## What are protected(private) routes in react?

Protected routes (or private routes) are routes that are accessible only to specific users or under certain conditions, such as being authenticated. They restrict access to certain parts of a React application, such as dashboards, admin pages, or user profiles.

```js
// src/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const Home = () => {
  return <h1>Home Page (Public)</h1>;
};

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h1>Dashboard (Protected)</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/dashboard");
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
```

## Route guard

A Route Guard is a mechanism that restricts access to certain routes based on specific conditions, such as authentication, user roles, or permissions. In React, route guards are typically implemented using React Router in combination with conditional rendering or custom components.

```js
const RouteGuard = ({ children, roles = [] }) => {
  const isAuth = isAuthenticated();
  const userRole = getUserRole();

  if (!isAuth) return <Navigate to="/login" />;
  if (roles.length && !roles.includes(userRole))
    return <Navigate to="/unauthorized" />;

  return children;
};
```

## Why we need nginx

Node.js has a built-in HTTP server, but it is not optimized for handling high traffic, static assets, or complex request routing efficiently. Nginx, on the other hand, is a highly performant, event-driven web server and reverse proxy. Here are the key reasons to use Nginx:

1. Reverse Proxy and Load Balancing

```js
http {
    upstream node_app {
        server 127.0.0.1:3000;
        server 127.0.0.1:3001;
        server 127.0.0.1:3002;
    }

    server {
        listen 80;
        location / {
            proxy_pass http://node_app;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
}

```

2. Static File Serving

- Nginx is highly optimized for serving static assets (e.g., images, CSS, JS).
- Node.js is not optimized for static file handling, but Nginx can serve them directly from the filesystem

3. Security and SSL/TLS Termination

- Nginx can handle SSL termination, offloading the encryption and decryption work from Node.js.
  - Benefits
    - Offloads SSL processing to Nginx, reducing Node.js CPU load
    - Simplifies SSL certificate management

4. Handling 504 Gateway Timeout Errors

- Benefits:
  - Ensures proper error handling.
  - Prevents users from waiting indefinitely for a response.

5. High Availability and Failover

- Nginx can manage multiple Node.js instances and reroute traffic in case of server failure

```js
http {
    upstream app_cluster {
        server 127.0.0.1:3000;
        server 127.0.0.1:3001;
        server 127.0.0.1:3002 backup;
    }

    server {
        listen 80;
        location / {
            proxy_pass http://app_cluster;
        }
    }
}

```

6. Enhanced Logging and Monitoring

- Nginx provides detailed access logs, error logs, and can be integrated with monitoring tools like ELK Stack, Datadog, and Prometheus.

7. Rate Limiting and DDoS Protection

- Nginx can limit requests to prevent DDoS attacks

```js
http {
    limit_req_zone $binary_remote_addr zone=mylimit:10m rate=10r/s;

    server {
        location / {
            limit_req zone=mylimit burst=20;
            proxy_pass http://localhost:3000;
        }
    }
}

```

## Worker Thread

worker thread create the thread and run concurrently

```js
// main.js
const { Worker } = require("worker_threads");

for (let i = 0; i < 10; i++) {
  const worker = new Worker("./worker.js", { workerData: i });

  worker.on("message", (msg) => {
    console.log(`Message from worker ${i}:`, msg);
  });

  worker.on("error", (err) => {
    console.error(`Worker ${i} error:`, err);
  });

  worker.on("exit", (code) => {
    console.log(`Worker ${i} exited with code:`, code);
  });
}

// worker.js
const { workerData, parentPort } = require("worker_threads");

const performTask = (data) => {
  let sum = 0;
  for (let i = 0; i < 1e8; i++) {
    sum += i;
  }
  return `Task ${data} completed. Sum: ${sum}, ${Date.now()}`;
};

const result = performTask(workerData);
parentPort.postMessage(result);
```

## Child Process

- Definition: Executes a separate Node.js instance, allowing multiple processes to run concurrently.
- Isolation: Each child process has its own memory, V8 instance, and Node.js runtime.
- Communication: Communicates via IPC (Inter-Process Communication) using process.send() and process.on('message').
- Use Case: Suitable for tasks that require complete isolation or when executing external scripts or programs.

```js
// main.js
const { fork } = require("child_process");

const child = fork("child.js");

child.send({ msg: "Hello from parent" });

child.on("message", (message) => {
  console.log("Message from child:", message);
});

// child.js
process.on("message", (message) => {
  console.log("Message from parent:", message);
  process.send({ msg: "Hello from child" });
});
```

## Concurrent Rendering in React

Concurrent Rendering is a feature introduced in React 18 that enables React to prepare multiple versions of the UI simultaneously. This allows React to work on a higher-priority update without blocking lower-priority updates. It helps to improve responsiveness, user experience, and performance, especially in large or complex applications.

- Improved User Experience: UI remains interactive during rendering.
- Better Scheduling: React can interrupt rendering work to handle urgent tasks.
- Suspense Support: Allows components to wait for data before rendering.
- Transition API: Smoothly manage state updates that are less urgent.

* Concurrent rendering is not automatic; you must use APIs like useTransition, useDeferredValue, and Suspense.

## event module

```js
const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

eventEmitter.on("greet", (name) => {
  console.log(`Hello, ${name}!`);
});

eventEmitter.emit("greet", "John"); // Output: Hello, John!
```
