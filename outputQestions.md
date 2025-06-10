```js
// In JavaScript, the value of this depends on how a function is called.

const obj = {
  value: 42,
  getValue: function () {
    return this.value;
  },
};

// Here, getValue is called as a method of the obj object: obj.getValue().
console.log(obj.getValue()); // 42

// Here, getValue is not called as a method of obj. It is called as a regular function
const getValue = obj.getValue;
console.log(getValue()); // undefined
```

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}

// 3, 3,3  //  because it is a block scope
```

```js
const myObj = {
  age: 15,
  normalFn: function () {
    console.log(this.age);
  },
  arrowFn: () => {
    console.log(this.age);
  },
};

myObj.normalFn(); // 15
myObj.arrowFn(); // undefined
```
