### Hooks

1. useState ✓
2. useEffect ✓
3. useCallback ✓
4. useMemo ✓
5. useDefferValue ✓
6. useLayoutEffect ✓
7. useId ✓
8. useReducer ✓
9. useRef ✓
10. useDebuggerValue ✓
11. useTransition ✓

## useDefferValue

It is act like debounce.
When a user types in an input field, you might want to display real-time search results. However, updating the results immediately on every keystroke can be costly. useDeferredValue allows you to delay updating the results while ensuring the input field remains responsive.

No fixed delay: Unlike setTimeout, React decides when to update based on available rendering time.

```js
function TestComp() {
  const [text, setText] = useState("");

  const defText = useDeferredValue(text);

  const list = useMemo(() => {
    let arr = [];
    for (let i = 0; i < 50000; i++) {
      arr.push(<p key={i}>{defText}</p>);
    }
    return arr;
  }, [defText]);

  return (
    <div>
      TestComp
      <input type="text" onChange={(e) => setText(e.target.value)} />
      {list.map((element) => element)}
    </div>
  );
}

export default TestComp;
```

## useLayoutEffect

Virtual DOM => DOM (updated) => useLayoutEffect => Browser Paint
Virtual DOM => DOM (updated) => Browser Paint => useEffect

useLayoutEffect runs before the paint, blocking rendering.
useEffect runs after the paint, without blocking UI updates.

- Runs synchronously after the DOM updates but before the browser paints.
- Blocks the paint until the effect completes.
- Suitable for operations that require immediate DOM manipulation (e.g., measuring layout, animations, synchronizing UI elements).
- Can cause performance issues if overused, as it blocks the UI update.

##### useEffect

- Runs asynchronously after the render is committed to the screen.
- The browser paints the UI first, and then React runs the effect.
- Suitable for operations that don’t need to block rendering, like fetching data, subscriptions, timers, and logging.
- Does not block the UI update, making it the preferred choice for most side effects.

## useId

The useId hook in React is used to generate unique IDs that remain consistent across renders. It is particularly useful in situations where you need unique identifiers for elements, such as associating labels with form inputs or ensuring unique id attributes in server-rendered applications.

```js
import { useId } from "react";

function MyForm() {
  const id = useId();
  return (
    <div>
      <label htmlFor={id}>Enter Name:</label>
      <input id={id} type="text" />
    </div>
  );
}
```

## useDebuggerValue

1. `useDebugValue` is a React Hook that helps with debugging custom hooks by displaying a custom label in React DevTools.
2. `useDebugValue(value)` it will always display
3. `useDebugValue(value, v=> somefun(v))` the function will execute on two condition
4. only on developer mode
5. once we open the React DevTool
6. for example if the function is takeing long time to execute then it will take long time to execute rest of the lines

```js
import { useDebugValue, useState } from "react";

function useCustomHook(initialValue) {
  const [value, setValue] = useState(initialValue);

  // Display value in React DevTools
  useDebugValue(value, (val) => `Current value: ${val}`);

  return [value, setValue];
}
```

## useTransition

When you have state updates that are not urgent (e.g., filtering a large list, fetching data, or rendering complex UI).

When you want to improve user experience by prioritizing more important updates (e.g., button clicks, input changes).

```js
import { useState, useTransition } from "react";

const MAX_RENDER = 30000;

function UseTransition() {
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue); // Urgent update (input change)

    // Defer the list update (non-urgent update)
    startTransition(() => {
      let arr = [];
      for (let index = 0; index < MAX_RENDER; index++) {
        arr.push(newValue);
      }
      setList(arr); // Update the list with the new array
    });
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder="Type something..."
      />
      {isPending ? (
        <div>Loading...</div> // Show a loading indicator while the transition is pending
      ) : (
        <ul>
          {list.map((item, index) => (
            <li key={index}>{item}</li> // Render the list items
          ))}
        </ul>
      )}
    </div>
  );
}
export default UseTransition;
```

### useContext Hook

```js
const MyContext = createContext();

const MyComp = () => {
  const { text } = useContext(MyContext);
  return <div> My Comp {text} </div>;
};

function App() {
  const [text, setText] = useState("myText");
  return (
    <MyContext.Provider value={{ text, setText }}>
      <TestComp />
      <MyComp />
    </MyContext.Provider>
  );
}
```

### useReducer

useReducer is a React Hook used for managing complex state logic in functional components. It is an alternative to useState, especially when state transitions depend on the previous state.

```js
import React, { useReducer } from "react";

const initialState = { count: 0 };

const reducer = (state, action) => {
  switch (action.type) {
    case "inc":
      return {
        ...state,
        count: action.inc ? state.count + action.inc : state.count++,
      };
    case "dec":
      return {
        ...state,
        count: action.dec ? state.count + action.dec : state.count,
      };
    default:
      return state;
  }
};

function TestComp() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      TestComp
      <button onClick={() => dispatch({ type: "inc", inc: 2 })}>
        Inc {state.count}
      </button>
      <button onClick={() => dispatch({ type: "dec", dec: 2.1 })}>Dec</button>
    </div>
  );
}

export default TestComp;
```

| Feature              | useState                                          | useReducer                         |
| -------------------- | ------------------------------------------------- | ---------------------------------- |
| Simple state         | ✅ Best for simple values (e.g., boolean, string) | ❌ Not needed                      |
| Complex state        | ❌ Becomes hard to manage                         | ✅ Ideal for multiple state values |
| Action-based updates | ❌ Requires multiple setters                      | ✅ Uses dispatch with actions      |
| Performance          | ⚠️ May cause unnecessary re-renders               | ✅ Better for large-scale apps     |

<br>
What mean cause unnecessary render <br>
1.  Even if you update the state with the same value, React still re-renders the component. <br>
2.  But useReducer will not re render if the updated value same

---
