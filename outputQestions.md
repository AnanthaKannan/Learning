```js
// In JavaScript, the value of this depends on how a function is called.

const obj = {
  value: 42,
  getValue: function () {
    return this.value;
  },
};

// Here, getValue is called as a method of the obj object: obj.getValue().
console.log(obj.getValue()); // 42

// Here, getValue is not called as a method of obj. It is called as a regular function
const getValue = obj.getValue;
console.log(getValue()); // undefined
```

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}

// 3, 3,3  //  because it is a block scope
```

```js
const myObj = {
  age: 15,
  normalFn: function () {
    console.log(this.age);
  },
  arrowFn: () => {
    console.log(this.age);
  },
};

myObj.normalFn(); // 15
myObj.arrowFn(); // undefined
```

```js
let obj = { a: 10, b: 20 }
let objCopy = obj

objCopy.b = 50

console.log(obj)
console.log(objCopy)

// both output will be { a: 10, b: 50 }
// This is because objects are reference types in JavaScript.
```

```js
var a
function a() {
  return true
}
console.log(a)

var b = 5
function b() {
  return true
}
console.log(b)
// Output will be:
// a is a function declaration, so it is hoisted to the top of its scope.
// b is a variable declaration, so it is hoisted but not initialized.
```


```js
const add = (x) => x + x;

function myFunc(num = 2, value = add(num)) {
  console.log(num, value);
}

myFunc(); // 2 4
myFunc(3); // 3 6
```

```js
function counter() {
  let count = 0;
  return function () {
    count++;
    console.log(count);
  };
}

const increment = counter();
increment();
increment();
increment();

// 1, 2, 3
```

```js
console.log('Start');
setTimeout(() => console.log('Middle'), 0);
new Promise((resolve) => resolve(console.log('Resolve')));
Promise.resolve().then(() => console.log('Promise'));
console.log('End');

/*
Start
Resolve
End
Promise
Middle
*/ 
```

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
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
