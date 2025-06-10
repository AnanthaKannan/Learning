## What is a JWT Token?

JWT (JSON Web Token) is a compact, URL-safe token format used for securely transmitting information between parties as a JSON object. The token is digitally signed, ensuring the integrity and authenticity of the information.

### Structure of a JWT Token

A JWT consists of three parts, separated by dots (.):

1. Header: Contains the token type (JWT) and the signing algorithm (e.g., HS256).

2. Payload: Contains claims (data) such as user ID, email, and expiration time.

3. Signature: Ensures the token has not been altered, created by signing the encoded header and payload using a secret or a private key.

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0IiwiZXhwIjoxNjkyMDgwMDAwfQ.pZuErK6tFjAwIGM26IbhF0M_qBBm7Zc5-Ln5sEVTssE
```

### How JWT Works in an Application

JWT is widely used for authentication and authorization in web applications.

1. User Login & Token Generation

   - When a user logs in with valid credentials, the server generates a JWT containing user details.

   - The token is sent to the client and stored (usually in localStorage, sessionStorage, or HTTP-only cookies).

2. Sending Token in Requests

   - The client includes the JWT in the Authorization header of each request to access protected resources.

3. Token Verification on the Server
   - The server extracts and verifies the token.
   - If valid, the request proceeds; otherwise, the request is rejected.

### Implementation Example

```js
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email },
    "your_secret_key", // Use environment variables for security
    { expiresIn: "1h" } // Token expires in 1 hour
  );
};

// Example usage
const user = { id: 1, email: "user@example.com" };
const token = generateToken(user);
console.log(token);
```

### Protecting Routes with JWT Middleware

```js
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Token required" });

  jwt.verify(token, "your_secret_key", (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    req.user = decoded; // Attach decoded user info to request
    next();
  });
};

// Usage in Express routes
app.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "You have access", user: req.user });
});
```

## Refresh token

store the refresh token into the http only cookeies, as the http cookies we can't able to access throw js code.
if we need to send the access token this is the way.

```js
const res = await fetch("/auth/token", {
  method: "POST",
  credentials: "include", // send cookies
});
```

### Best Practices

1. Use HTTP-only Cookies for storing JWTs to prevent XSS attacks.

2. Set Expiry Time to avoid long-lived tokens being misused.

3. Use Refresh Tokens to generate new access tokens without re-authentication.

4. Use Environment Variables for secret keys instead of hardcoding.

# oAuth Token

1. Backend (Node.js + Express) - server.js

```curl
npm init -y
npm install express axios dotenv cors cookie-parser
```

```env
<!-- env file -->
GOOGLE_CLIENT_ID=<YOUR_GOOGLE_CLIENT_ID>
GOOGLE_CLIENT_SECRET=<YOUR_GOOGLE_CLIENT_SECRET>
REDIRECT_URI=http://localhost:5000/auth/google/callback
FRONTEND_URL=http://localhost:3000
JWT_SECRET=mysecretkey

```

```js
// server.js4
require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5000;

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(cookieParser());

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// Step 1: Redirect to Google OAuth 2.0
app.get("/auth/google", (req, res) => {
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
  res.redirect(googleAuthUrl);
});

// Step 2: Handle Google OAuth 2.0 Callback
app.get("/auth/google/callback", async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: "Authorization code is missing" });
  }

  try {
    // Exchange code for access token
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      },
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const { access_token } = tokenResponse.data;

    // Fetch user info
    const userInfoResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const user = userInfoResponse.data;

    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Set to `true` in production with HTTPS
    });

    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  } catch (err) {
    console.error("Error during Google OAuth:", err.message);
    res.status(500).json({ error: "Authentication failed" });
  }
});

// Protected route
app.get("/api/protected", (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ message: "Protected data", user: decoded });
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

## Frontend

```js
import React, { useEffect, useState } from "react";
import axios from "axios";

const SERVER_URL = "http://localhost:5000";

function App() {
  const [userData, setUserData] = useState(null);

  const handleLogin = () => {
    window.location.href = `${SERVER_URL}/auth/google`;
  };

  const fetchProtectedData = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/protected`, {
        withCredentials: true,
      });
      setUserData(response.data);
    } catch (err) {
      console.error("Error fetching protected data:", err.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchProtectedData();
      } catch (err) {
        console.error("Error:", err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Google OAuth 2.0 Authentication</h1>
      <button onClick={handleLogin}>Login with Google</button>

      {userData ? (
        <div>
          <h2>Protected Data:</h2>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
      ) : (
        <p>Please log in to view protected data.</p>
      )}
    </div>
  );
}

export default App;
```
