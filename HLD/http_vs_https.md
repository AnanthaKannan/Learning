# HTTP VS HTTPS
HTTP (Hypertext Transfer Protocol) is the protocol used by browsers (like Chrome or Firefox) to request and receive web pages from servers.

| Feature           | HTTP       | HTTPS                |
| ----------------- | ---------- | -------------------- |
| **Security**      | Not secure | Encrypted & secure   |
| **Port**          | 80         | 443                  |
| **Data Transfer** | Plain text | Encrypted            |
| **Uses SSL/TLS**  | ❌ No       | ✅ Yes                |
| **Browser lock**  | ❌ No       | ✅ Yes (🔒 lock shown) |


* Your mental model (corrected):
* Browser requests https://xyz.com.
* Server sends SSL/TLS certificate (contains public key).
* Browser validates the certificate.
* Browser generates a session key, encrypts it with server’s public key, sends it to server.
* Server decrypts the session key using its private key.
* Now both browser and server use the session key to encrypt/decrypt all data (fast). this encryption called Symmetric. it is very fast.

---
## Server’s memory structure
If 1M user hit the server then 1M session key will be generate and identified in this format
| 🖥️ **TCP Socket**       | 🔑 **Session Key** |
| ---------------------- | ----------------- |
| (User1 IP\:Port → 443) | SessionKey1       |
| (User2 IP\:Port → 443) | SessionKey2       |
| (User3 IP\:Port → 443) | SessionKey3       |
---

## What all are the validation will happen
* Is it issued by a trusted Certificate Authority (CA)?
* Is it expired?
* Does the domain name match?
* Has it been revoked?

---

## What happen if the certificate is not valid
* The browser blocks the connection.
* Shows a warning screen:

```
Chrome: “Your connection is not private” (ERR_CERT_AUTHORITY_INVALID, ERR_CERT_DATE_INVALID, etc.).
```
```
Firefox: “Warning: Potential Security Risk Ahead.”
```
```
The page doesn’t load unless the user manually accepts the risk (clicks “Proceed anyway” in some browsers).
```

## 🔑 Difference Between Symmetric and Asymmetric Encryption

| Feature                  | 🔒 **Symmetric Encryption**                                 | 🔑 **Asymmetric Encryption**                           |
| ------------------------ | ---------------------------------------------------------- | ----------------------------------------------------- |
| **Keys used**            | 🗝️ **One key** for encryption & decryption                  | 🔑 **Two keys**: Public key & Private key              |
| **Speed**                | ⚡ **Fast** (lightweight, used for bulk data)               | 🐢 **Slower** (heavy computation, used for small data) |
| **Key Sharing Problem?** | ❌ Yes (must securely share the secret key)                 | ✅ No (public key can be shared openly)                |
| **Encryption type**      | Same key for lock & unlock                                 | Public key locks, private key unlocks                 |
| **Used for**             | Encrypting **large amounts of data** (HTTPS data transfer) | Exchanging **session keys**, digital signatures       |
| **Example Algorithm**    | AES, DES, ChaCha20                                         | RSA, ECC, DSA                                         |
| **Example key size**     | 128-bit, 256-bit                                           | 2048-bit, 4096-bit                                    |

---

## 📜 Difference between SSL and TLS
✅ Today, when people say “SSL certificate” they really mean “TLS certificate.”


| Feature       | SSL            | TLS                           |
| ------------- | -------------- | ----------------------------- |
| ✅ Status      | ❌ Outdated     | ✅ Active (current standard)   |
| 🔒 Security    | Weaker         | Stronger (better ciphers)     |
| 📅 Introduced  | 1994 (SSL 1.0) | 1999 (TLS 1.0)                |
| 🔥 Usage today | Deprecated     | TLS 1.2 & 1.3 are widely used |

---
## What is mean by Handshake
The client and server exchange the session keys securely.
---

## Notes
1. Session keys for life time, until the session is closed
2. 

### Questions

* different between http and http2