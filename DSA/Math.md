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

### 

