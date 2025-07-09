# 🔥 Hashed Sharding in MongoDB

## 🧩 What is Hashed Sharding?

Hashed sharding is a **sharding strategy** in MongoDB where the values of the **shard key** are passed through a **hash function**, and the resulting hash values are used to distribute data **evenly** across all shards.

Instead of assigning **contiguous ranges of shard key values** to a shard (as in ranged sharding), MongoDB **hashes** the shard key to spread documents pseudo-randomly across shards.  

This is especially useful for workloads where:  
- Insertions are concentrated on certain shard key values (e.g., sequential IDs).  
- You want **even data distribution** and to avoid "hotspots".

---

## 🛠 How It Works

1. **Hashing the shard key**
   - MongoDB applies a hash function (a consistent, deterministic algorithm) to the shard key value.
   - The hash value is then used to determine **which chunk** and **which shard** the document belongs to.

2. **Chunk Distribution**
   - MongoDB divides the hash space into **chunks** (small ranges of hash values).
   - Chunks are distributed across the shards.

3. **Query Routing**
   - For queries with a specific shard key value, MongoDB hashes that value and routes the query directly to the shard holding the relevant chunk.
   - For queries without the shard key, MongoDB sends the query to **all shards** (scatter-gather).

---

## ✅ Advantages of Hashed Sharding

✔ **Even Data Distribution**
- Prevents a single shard from becoming a **hotspot**.
- Works well even if your shard key values are **sequential** (like `user_id`, timestamps, etc.).

✔ **Good for Write-Heavy Workloads**
- Inserts are spread across multiple shards.
- Reduces write contention on a single shard.

---

## ⚠️ Disadvantages of Hashed Sharding

❌ **Range Queries Become Inefficient**
- Since the shard key is hashed, documents with **adjacent shard key values** might end up on **different shards**.
- Queries like `find({ user_id: { $gte: 1000, $lte: 2000 } })` will need to **scan all shards**.

❌ **Poor Locality**
- Documents with related shard key values are **not stored together**.

---

## 📖 Example: Hashed Sharding in MongoDB

### 1. Enable sharding on a database
```js
sh.enableSharding("myDatabase")
```

### 2. Shard a collection using hashed shard key
```js
sh.shardCollection("myDatabase.myCollection", { "user_id": "hashed" })
```

Here MongoDB will hash the `user_id` field and distribute documents across shards.

---

## 📊 Visual Representation

```
Hash Function
   |
   v
user_id = 1001  --->  hash(1001) = abc123
                              |
                              v
               Chunk: [abc100, abc1FF] --> Shard A
```

Instead of storing all `user_id` values near `1001` on the same shard, hashed sharding **spreads them randomly** across shards.

---

## 🗺️ When to Use Hashed Sharding?

✅ Use it when:  
- Your workload has **sequential or monotonically increasing shard keys** (like timestamps or auto-increment IDs).  
- You want **uniform distribution** of data and load.  

🚫 Avoid it if:  
- Your application heavily depends on **range queries** over the shard key.

---

