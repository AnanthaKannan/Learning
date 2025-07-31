## Session-Based Authentication
1. User logs in: They send their credentials (usually via a login form).

2. Server verifies the credentials: If valid, the server creates a session—a piece of data stored on the server that tracks that user's identity.

3. Session ID is sent to the client: The server responds by setting a cookie in the user’s browser containing the session ID.

4. Subsequent requests: The client (browser) automatically sends the session ID with each request. The server uses it to look up the session and identify the user.

5. Logout: The server can destroy the session at logout, making the session ID invalid.

### Advantages of Session-Based Authentication
| Advantage                                 | Explanation                                                                                                             |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| ✅ **Centralized control**                 | The server controls sessions, so you can easily revoke or expire them.                                                  |
| ✅ **Less risk of token theft**            | Tokens aren't exposed in URLs or local storage—cookies are more secure (especially with `HttpOnly` and `Secure` flags). |
| ✅ **Built-in support in many frameworks** | Web frameworks like Django, Rails, Express.js have session support out of the box.                                      |
| ✅ **Easy to invalidate**                  | Sessions can be killed at the server side—useful for logging users out across devices.                                  |

### Disadvantages of Session-Based Authentication
| Disadvantage               | Explanation                                                                                                                                               |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ❌ **Not stateless**        | The server must store session data (in memory or database), which doesn’t scale well for large, distributed systems.                                      |
| ❌ **CSRF vulnerabilities** | Cookies are automatically sent by browsers, which makes the system vulnerable to **Cross-Site Request Forgery** (can be mitigated with anti-CSRF tokens). |
| ❌ **Scalability issues**   | Managing sessions across multiple servers (in load-balanced environments) can be complex—requires shared storage like Redis.                              |
| ❌ **More overhead**        | The server must look up the session in storage for every request, which adds a small performance hit.                                                     |



## What is a CSRF Vulnerability?
**CSRF (Cross-Site Request Forgery)** is a type of attack where a malicious website tricks a user’s browser into making **unintended requests** to another website **where the user is authenticated.**
<br>
**In simpler terms:**
<br>
Imagine you're logged into your bank account in one browser tab. Then, you visit a malicious website in another tab. That malicious site secretly tells your browser to send a request to your bank to transfer money. Since you're already logged in, your browser includes your **session cookie**, and the bank thinks you made the request—even though you didn’t.

## Why CSRF Happens with Session-Based Auth
* Session cookies are sent automatically by the browser with every request to the domain.

* If there’s **no CSRF protection**, the server has no way to know whether the request came from your app or a malicious site.

## How to Prevent CSRF
| Method                        | Description                                                                                                                   |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 🔐 **CSRF Tokens**             | Generate a **unique token** when rendering a form. The server checks this token on form submission to ensure it’s legitimate. |
| 🛡️ **SameSite Cookies**        | Set cookie attribute `SameSite=Strict` or `Lax` to prevent cookies from being sent with cross-site requests.                  |
| 🚫 **Check Referer/Origin**    | Verify that the request came from your own site.                                                                              |
| 🔐 **Use POST instead of GET** | GET requests should never change state (e.g., no money transfers). Use POST or other methods for sensitive actions.           |
