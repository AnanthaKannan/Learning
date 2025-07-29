# OSI Model (Open Systems Interconnection Model)

The **OSI model** is a conceptual framework used to understand and implement network communications by dividing them into **seven distinct layers**. Each layer has specific functions and communicates with the layers directly above and below it.

---

## 🧱 Layers of the OSI Model (Top to Bottom)

| Layer            | Layer Number | Description                                                            |
| ---------------- | ------------ | ---------------------------------------------------------------------- |
| **Application**  | 7            | Closest to the end user. Interfaces with the software applications.    |
| **Presentation** | 6            | Translates, encrypts, and compresses data.                             |
| **Session**      | 5            | Manages sessions and controls dialog between computers.                |
| **Transport**    | 4            | Ensures error-free, complete data transfer (TCP/UDP).                  |
| **Network**      | 3            | Handles routing, addressing (IP), and delivery between networks.       |
| **Data Link**    | 2            | Provides error detection and MAC addressing. Divided into LLC and MAC. |
| **Physical**     | 1            | Transfers raw bitstream over the physical medium (cables, switches).   |

---

## 🔍 Detailed Explanation of Each Layer

### 1. **Physical Layer (Layer 1)**
- **Function**: Transmits raw bits (0s and 1s) over a physical medium.
- **Examples**: Ethernet cables, fiber optics, hubs.
- **Key Concepts**: Voltage levels, timing of voltage changes, physical data rates.

---

### 2. **Data Link Layer (Layer 2)**
- **Function**: Responsible for node-to-node data transfer and error detection.
- **Divisions**:
  - **MAC (Media Access Control)**: Controls how devices gain access to the medium.
  - **LLC (Logical Link Control)**: Manages frame synchronization, flow control.
- **Examples**: Switches, bridges, MAC address.

---

### 3. **Network Layer (Layer 3)**
- **Function**: Handles packet forwarding including routing through routers.
- **Key Protocols**: IP (IPv4/IPv6), ICMP.
- **Examples**: Routers, Layer 3 switches.

---

### 4. **Transport Layer (Layer 4)**
- **Function**: Ensures complete data transfer with error recovery.
- **Key Protocols**: TCP (reliable), UDP (unreliable).
- **Features**: Flow control, error detection, segmentation and reassembly.

---

### 5. **Session Layer (Layer 5)**
- **Function**: Manages and controls dialog between two devices.
- **Responsibilities**:
  - Establish, maintain, and terminate sessions.
  - Synchronization and checkpointing.
- **Examples**: Remote procedure calls (RPC), NetBIOS.

---

### 6. **Presentation Layer (Layer 6)**
- **Function**: Translates data between the application and the network.
- **Tasks**:
  - Data encryption/decryption
  - Data compression
  - Data translation (e.g., EBCDIC to ASCII)
- **Examples**: SSL/TLS, JPEG, MPEG.

---

### 7. **Application Layer (Layer 7)**
- **Function**: Provides services for end-user applications.
- **Examples**: HTTP, FTP, SMTP, DNS, Telnet, SNMP.

---

## 🔁 OSI Model Summary Mnemonic

To remember layers from top (Layer 7) to bottom (Layer 1):

> **All People Seem To Need Data Processing**

Or reverse (Layer 1 to 7):

> **Please Do Not Throw Sausage Pizza Away**

---

## 📌 Notes

- The OSI model is **theoretical**, not strictly followed in practice.
- The **TCP/IP model** is a practical counterpart with 4 layers.
- Devices like **routers, switches, hubs** work at different OSI layers.

---

## 📚 Real-World Device and Protocol Mapping

| Device/Protocol  | OSI Layer |
| ---------------- | --------- |
| Hub              | 1         |
| Switch (Layer 2) | 2         |
| Router           | 3         |
| TCP/UDP          | 4         |
| SSL/TLS          | 6         |
| HTTP/FTP         | 7         |

---
