Redux follows a unidirectional data flow and consists of:

1. Store – The central state container.
2. Actions { type: INCREMENT } – Objects describing what should change in the state.
3. Reducers function with switch case – Functions that specify how the state should change based on actions.
4. Dispatch dispatch({ type: INCREMENT }) – A method to send actions to reducers.
5. Selectors – Functions to extract data from the Redux store.
6. Middleware – For handling async operations like API calls. <br>

### Reducer

useReducer is a React Hook used for managing complex state logic in functional components. It is an alternative to useState, especially when state transitions depend on the previous state.

```js
const initialState = { count: 0 };

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    case "INCREMENT_BY_AMOUNT":
      return { ...state, count: state.count + action.payload };
    default:
      return state;
  }
};

export default counterReducer;
```

### store

```js
import { legacy_createStore as createStore } from "redux";
import counterReducer from "./counterReducer";

export const store = createStore(counterReducer);


------------------- for multiple reducer --------------------

import { applyMiddleware, legacy_createStore as createStore, combineReducers, } from "redux";
import thunk from "redux-thunk";
import counterReducer from "./counterReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  users: userReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

```

### main.js

```js
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./redux/store";

import { Provider } from "react-redux";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
```

### Component

```js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../actions/userActions";

const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers()); // Dispatch fetchUsers when component mounts
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default UserList;
```

## userActions.js

```js
export const fetchUsers = () => {
  return async (dispatch) => {
    dispatch({ type: "FETCH_USERS_REQUEST" });
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      dispatch({ type: "FETCH_USERS_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_USERS_FAILURE", payload: error.message });
    }
  };
};
```

---

# Redux ToolKit

Redux Toolkit (RTK) is the official, recommended way to use Redux in modern React applications. It simplifies Redux development by providing utilities for state management, reducing boilerplate code, and improving performance.

## 🔹 Why Use Redux Toolkit?

- **Less Boilerplate**: No need to write separate action creators, reducers, and switch cases manually.

- **Built-in Immer**: Allows direct state mutation in reducers.

- **Includes Thunk Middleware**: Supports async logic without extra setup.

- **Auto-generates Action Types**: Reduces manual work.

- **Integration with RTK Query**: Fetch API data efficiently.

## 🛠️ Steps to Set Up Redux Toolkit in React

### 1️⃣ Install Redux Toolkit and React-Redux

```
npm install @reduxjs/toolkit react-redux
```

### 2️⃣ Create a Redux Slice

A slice is a combination of actions and reducers in one file.

```js
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```

### 3️⃣ Configure the Store

```js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;
```

### 4️⃣ Provide the Store in React

```js
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

### 5️⃣ Use Redux State in Components

Access State

```js
import { useSelector } from "react-redux";

const CounterDisplay = () => {
  const count = useSelector((state) => state.counter.value);
  return <h1>Count: {count}</h1>;
};

export default CounterDisplay;
```

Dispatch Actions

```js
import { useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount } from "./counterSlice";

const CounterButtons = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
    </div>
  );
};

export default CounterButtons;
```

### 🔥 Extra: Handling Async Requests (RTK Thunk)

Redux Toolkit supports asynchronous operations using createAsyncThunk.

```js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk("user/fetchUser", async (userId) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  return response.json();
});

const userSlice = createSlice({
  name: "user",
  initialState: { user: null, status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default userSlice.reducer;
```

### 🔹 Dispatching the Async Action in a Component

```js
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./userSlice";
import { useEffect } from "react";

const UserProfile = ({ userId }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const status = useSelector((state) => state.user.status);

  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [dispatch, userId]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error loading user.</p>;

  return <h1>{user?.name}</h1>;
};
```
