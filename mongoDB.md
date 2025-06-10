# MongoDB

- Collection
- Document

## Pagination in mongod db

```js
const page = 2; // current page
const pageSize = 10; // number of items per page

db.users
  .find()
  .skip((page - 1) * pageSize) // skip the number of items from previous pages
  .limit(pageSize); // limit the number of items per page

// --------------------------------------------

db.users.aggregate([
  { $sort: { _id: 1 } }, // Optional: Sort by _id or another field
  { $skip: (page - 1) * pageSize },
  { $limit: pageSize },
]);
```

## Regex in mongodb

```js
db.collection.find({
  email: { $regex: "@gmail.com$", $options: "i" },
});

// end of the string (denoted by $)
//  $options: 'i' makes the query case-insensitive, so it will match emails like sree@gmail.com, Kannan@Gmail.com, etc.
```

### How to refer document in mongodb

```js
const mongoose = require("mongoose");

_hospitalId:{
    type: Schema.Types.ObjectId,
    ref: 'Hospital',
    require: true
  },
```

## GroupBy mongodb

```js
// data
[
  { _id: 1, item: "apple", quantity: 5, price: 10 },
  { _id: 2, item: "banana", quantity: 10, price: 5 },
  { _id: 3, item: "apple", quantity: 15, price: 10 },
  { _id: 4, item: "banana", quantity: 20, price: 5 },
];

// query
db.sales.aggregate([
  {
    $group: {
      _id: "$item",
      totalQuantity: { $sum: "$quantity" },
    },
  },
]);

// result
[
  { _id: "apple", totalQuantity: 20 },
  { _id: "banana", totalQuantity: 30 },
];

/*
totalQuantity: { $sum: "$quantity" },
avgPrice: { $avg: "$price" }
totalSales: { $sum: { $multiply: ["$price", "$quantity"] } }
*/
```

## Aggregation in MongoDB

Aggregation in MongoDB is a way of processing a large number of documents in a collection by passing them through various stages. Each stage transforms the documents in some way, and the output of one stage is passed as input to the next stage. This is similar to the concept of a data pipeline.

- $match – Filters documents by specified criteria (similar to find()).
- $group – Groups documents by a specified key and applies aggregate functions (like sum, avg, min, max).
- $project – Shapes the output, allowing you to include, exclude, or add new fields.
- $sort – Sorts documents by a specified field.
- $limit – Limits the number of documents passed to the next stage.
- $skip – Skips a specified number of documents.
- $unwind – Deconstructs an array field into multiple documents.
- $lookup – Performs left outer joins to other collections.
- $addFields – Adds new fields to documents.
- $set – Adds or updates fields in the documents.

## In query

```js
{userId: 1, orgId: [10, 22]}

db.collection.find({
  userId: 1,
  orgId: { $in: [10, 22] }
})
```

## Denormalization in MongoDB

Denormalization in MongoDB refers to the process of embedding related data within a single document rather than storing it in separate collections and linking them via references. This approach is common in NoSQL databases to optimize query performance by reducing the number of read operations.

### Example: Normalized vs. Denormalized Structure

Structure Normalized

```js
// Users Collection:

{
  "_id": 1,
  "name": "Alice",
  "email": "alice@example.com"
}

// Orders Collection:
{
  "_id": 101,
  "user_id": 1,
  "product": "Laptop",
  "amount": 1500
}

```

To get a user’s orders, you need to perform two queries:

- One to fetch the user.
- Another to fetch the orders by user_id.

Denormalized Structure: <br>
In the denormalized structure, the orders are embedded within the user document:

```js
// Users Collection:

{
  "_id": 1,
  "name": "Alice",
  "email": "alice@example.com",
  "orders": [
    {
      "order_id": 101,
      "product": "Laptop",
      "amount": 1500
    },
    {
      "order_id": 102,
      "product": "Mouse",
      "amount": 20
    }
  ]
}

```

Now, a single query retrieves both user information and their orders. <br>

When to Denormalize in MongoDB?

- When data access patterns involve frequent read operations of related data.
- When the related data is relatively static or infrequently updated.
- When minimizing query complexity is prioritized over storage efficiency.

Trade-offs of Denormalization: <br>

- Increased Storage: Data redundancy leads to higher storage requirements.
- Update Complexity: Updating data in multiple locations can lead to inconsistencies.
- Data Inconsistency: Multiple copies of the same data can become inconsistent if not properly managed.

---
