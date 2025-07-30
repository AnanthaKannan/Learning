# REST
The **REST protocol**, short for **Representational State Transfer**, is an architectural style used for designing networked applications, particularly web services. It is **not** a protocol in the strict sense (like HTTP or FTP), but a set of constraints or principles that use standard HTTP methods.

## 📌 Key Principles of REST

1. **Client-Server Architecture**  
   The client and server are independent. The client requests data, and the server provides responses.

2. **Stateless**  
   Every request from the client must contain all the necessary information. The server does **not** store anything about the client’s session.

3. **Cacheable**  
   Responses must indicate if they are cacheable. This improves efficiency by allowing clients to reuse prior responses.

4. **Uniform Interface**  
   A consistent way to interact with resources using HTTP methods:
   - `GET`: Retrieve data
   - `POST`: Create new data
   - `PUT`: Update existing data
   - `DELETE`: Remove data
   - `PATCH`: Partial update

5. **Layered System**  
   Clients don’t need to know whether they are communicating with the actual server or an intermediary (like a load balancer or cache).

6. **Representation of Resources**  
   Resources are accessed via URIs and are usually represented in formats like **JSON** or **XML**.

### Example RESTful API Request:
```js
GET /api/users/1 HTTP/1.1
Host: example.com
```