## Greatest common divisor
Euclidean Algorithm (Fastest)

1. Take the larger number and divide it by the smaller number.
2. Replace the larger number with the remainder.
3. Repeat until the remainder is 0 — the last non-zero remainder is the GCD.
```js
// 8, 6 = 6
// 10, 6 = 2
const gcd = (a: number, b: number) => {
  if (!b) {
    return a;
  }

  return gcd(b, a % b);
}
```

## Rotate the value this much time
* head = [0,1,2], k = 4
* 1st time = [2, 0, 1]
* 2nd time = [1, 2, 0]
* 3rd time = [0, 1, 2]
* 4th time = [2, 0, 1]

```js
// calculation
const k = k % length; // 4 % 3 ans 1
```

### add the number from 1-100
```
formula = n*(n-1)/2
```

## Happy number
return the value come with 1. but what happen if the value continue with loop.
yes it will return the same number. so we can find it is in loops
```
Input: n = 19
Output: true
Explanation:
12 + 92 = 82 // it is not 12 it is 1 square
82 + 22 = 68
62 + 82 = 100
12 + 02 + 02 = 1
```

### Question
1. what is mean by square root

### understand this
https://leetcode.com/problems/subarray-sum-equals-k/description/
