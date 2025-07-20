# TCP
The TCP protocol (Transmission Control Protocol) is one of the core protocols of the Internet protocol suite. It is used to establish and manage reliable communication between devices over a network, such as the Internet.
---
✅ What is TCP?

* TCP is a connection-oriented protocol, meaning it establishes a connection between two devices before transmitting data
* It ensures that data is delivered accurately and in the correct order.
* Used for applications where reliable delivery is critical (like web browsing, email, and file transfers).
---
✅ How TCP works (key features):

* Three-Way Handshake – Before sending data, TCP sets up a connection using SYN, SYN-ACK, and ACK packets.
* Segmentation and Reassembly – Breaks large messages into smaller packets and reassembles them at the destination.
* Error Detection and Recovery – Uses sequence numbers and acknowledgments to detect lost or corrupted packets and retransmits them if needed.
* Flow Control – Prevents the sender from overwhelming the receiver with too much data at once.
* Reliable Delivery – Guarantees that all data is delivered without duplication or loss.
---
✅ TCP 3-Way Handshake (Connection setup)
Before two devices (like your computer and a web server) exchange data, they establish a connection using a process called the three-way handshake.
<br>
Here’s how it works:

1️⃣ SYN (Synchronize): <br>
The client (your computer) sends a packet to the server with a SYN (synchronize) flag to say “I want to connect.”<br>

2️⃣ SYN-ACK (Synchronize-Acknowledge):<br>
The server responds with a packet that has both SYN and ACK flags set. It says, “Okay, I got your request, and I’m ready too.”<br>

3️⃣ ACK (Acknowledge):<br>
The client sends an ACK packet back to the server saying, “Great, let’s start sending data!”<br>

🎯 Now the connection is established. <br>

| Client                  | Server              |
| ----------------------- | ------------------- |
| ------ SYN -----------> | (Hey, can we talk?) |
| <----- SYN-ACK -------- | (Sure, I’m ready!)  |
| ------ ACK -----------> | (Great, let’s go!)  |
---

✅ Where is TCP used?
* Web traffic (HTTP/HTTPS)
* Email (SMTP, IMAP, POP3)
* File transfers (FTP)
* Remote login (SSH, Telnet)

## How HTTP Protocol used TCP Protocol
HTTP cannot send data directly over the internet – it needs a transport protocol underneath. <br>
HTTP relies on TCP (Transmission Control Protocol) to transport its messages reliably between client and server. <br>

1. 📝 Step 1: Client establishes a TCP connection
     * When you type www.google.com in your browser, the browser first establishes a TCP connection to Google’s web server.
     * This happens using the TCP 3-way handshake
2. 📝 Step 2: HTTP request is sent over TCP
   * The browser sends an HTTP request over the established TCP connection:
   * This request is broken into TCP segments, and TCP ensures they arrive in the right order.
3. 📝 Step 3: Server responds using HTTP over TCP
   * The server sends back an HTTP response:
   * Again, TCP handles splitting this data into packets, error-checking, and reassembling it at the client side.
4. 📝 Step 4: TCP connection is closed
   * Once the HTTP exchange is done, the browser or server can close the TCP connection using a TCP connection teardown (FIN-ACK process).

## 🌐 HTTP over TCP (Protocol Layers)
```sql
+--------------------------+
|      Application Layer   |
|   HTTP (Web Protocol)    |  👈 Browser sends "GET /index.html"
+--------------------------+
|     Transport Layer      |
|   TCP (Reliable Delivery)|  👈 Breaks data into segments, ensures order
+--------------------------+
|    Internet Layer        |
|   IP (Routing Packets)   |  👈 Finds the path to the web server
+--------------------------+
|   Network Access Layer   |
|   Ethernet/Wi-Fi etc.    |  👈 Sends raw bits over the physical network
+--------------------------+
```
🖥️ On the Client (Browser)
1. Browser (Application) sends HTTP request →
1. TCP (Transport) divides request into packets →
1. IP (Internet) routes those packets to the server →
1. Network Layer transmits over Ethernet/Wi-Fi.

🖥️ On the Server
1. Receives packets at Network Layer →
1. IP reassembles and passes to TCP →
1. TCP reorders packets and ensures no data is missing →
1. HTTP (Web Server) processes the request and sends a response back.




## Questions