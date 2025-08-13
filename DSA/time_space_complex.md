# What is Time Complexity?
Time complexity tells you how the running time of an algorithm grows as the input size increases.

* 📦 Bigger input → ⏳ More time (in a predictable pattern)
* We use Big O notation to describe it.

## O(1) – Constant time
No matter how big the input, time is the same.
```ts
function getFirstElement(arr: number[]): number {
    return arr[0]; // Just one step
}
```
* Input size 1 → 1 step
* Input size 1 million → still 1 step
* ✅ Fastest type of complexity.

## O(n) – Linear time
Time grows directly with input size.
* Input size 10 → 10 steps
* Input size 1000 → 1000 steps
```ts
function printArray(arr: number[]): void {
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
    }
}
```

## O(n²) – Quadratic time
* Time grows with the square of the input.
* Input size 10 → 100 steps
* Input size 100 → 10,000 steps
```ts
function printPairs(arr: number[]): void {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            console.log(arr[i], arr[j]);
        }
    }
}
```

## O(log n)
It means that the number of steps grows very slowly compared to the size of the input. <br>
Specifically, every time you do something, the input size gets divided (usually by 2). <br>
Thinking:
* O(n) → check every element
* O(log n) → throw away half the elements each time

```ts
function binarySearch(arr: number[], target: number): number {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) return mid;

        if (arr[mid] < target) {
            left = mid + 1; // eliminate left half
        } else {
            right = mid - 1; // eliminate right half
        }
    }
    return -1;
}

console.log(searchInsert([1, 3, 5, 6], 5)); // Output: 2
console.log(searchInsert([1, 3, 5, 6], 2)); // Output: 1

```
* Start with 8 elements → check middle → 4 left → 2 left → 1 left → done.
* For n = 8, steps = 3.
* For n = 1,000,000, steps ≈ 20.

## O(log² n)

---
# What is Space Complexity?
Space complexity tells you how much extra memory your algorithm uses besides the input itself.
<br>
Think of it like: 📦 Bigger input → 💾 More RAM needed.

## O(1) Space – Constant space
Only uses a fixed number of variables, regardless of input size.
```ts
function sumArray(arr: number[]): number {
    let sum = 0; // only one extra variable
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}
```

## O(n) Space – Linear space
Uses extra memory proportional to input size.
```ts
function copyArray(arr: number[]): number[] {
    let copy: number[] = [];
    for (let i = 0; i < arr.length; i++) {
        copy.push(arr[i]);
    }
    return copy;
}
```



| **Input size (n)** | **O(1)**<br>(Constant) | **O(log n)**<br>(Logarithmic) | **O(n)**<br>(Linear) | **O(n²)**<br>(Quadratic) |
| ------------------ | ---------------------- | ----------------------------- | -------------------- | ------------------------ |
| **10**             | 1 step                 | \~3 steps                     | 10 steps             | 100 steps                |
| **100**            | 1 step                 | \~7 steps                     | 100 steps            | 10,000 steps             |
| **1,000**          | 1 step                 | \~10 steps                    | 1,000 steps          | 1,000,000 steps          |
| **1,000,000**      | 1 step                 | \~20 steps                    | 1,000,000 steps      | 1,000,000,000,000 steps  |


