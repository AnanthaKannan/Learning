## MVC
* Model: used to write the buisness logic and manage data.
* View: used to display the data to the user (UI components).
* Controller: acts as an intermediary between Model and View, handling user input and updating the Model and View accordingly.
```jsx
// src/mvc/Controller.tsx
import React, { useState } from 'react';
import * as model from './model'; // Model
import View from './View'; // View

export const Controller: React.FC = () => {
  const [data, setData] = useState(model.getData());

  const handleUpdate = (newData: string) => {
    model.updateData(newData); // Update Model
    setData(model.getData()); // Update View
  };

  return <View data={data} onUpdate={handleUpdate} />; // Render View
};

//src/mvc/View.tsx
import React from 'react';
interface ViewProps {
  data: string;
  onUpdate: (newData: string) => void;
}
const View: React.FC<ViewProps> = ({ data, onUpdate }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(e.target.value);
  };

  return (
    <div>
      <h1>Data: {data}</h1>
      <input type="text" value={data} onChange={handleChange} />
    </div>
  );
};
export default View;

// src/mvc/model.ts
let data = 'Initial Data';

export const getData = () => data;

export const updateData = (newData: string) => {
  data = newData;
};
```

## What happens on lazy loading
1. on initial load, only the main chunk and any immediately necessary chunks are loaded.
2. when a user navigates to a route that requires additional code, a request is made to fetch the corresponding chunk.
3. once the chunk is loaded, the application can render the new route or component.

## Difference between React Node, Element, and Component
* React Node: A React Node is a broader term that encompasses anything that can be rendered in React, including React elements, strings, numbers, fragments, portals, and arrays of nodes.
* React Element: <div>element</div>
* React Component: A React Component is a function or class that optionally accepts inputs (props) and returns a React Node. Components can be stateful or stateless and are reusable building blocks in a React application.

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
---
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