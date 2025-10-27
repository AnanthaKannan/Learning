# Stack

A stack is a linear data structure that follows the Last In First Out (LIFO) principle. In a stack, the last element added is the first one to be removed. Stacks are used in various applications, such as function call management, expression evaluation, and backtracking algorithms.

## Operations

1. **Push**: Add an element to the top of the stack.
2. **Pop**: Remove and return the top element of the stack.
3. **Peek**: Return the top element without removing it.
4. **isEmpty**: Check if the stack is empty.

## Applications

- **Function Call Management**: Stacks are used to manage function calls and local variables in programming languages.
- **Expression Evaluation**: Stacks are used to evaluate postfix and infix expressions.
- **Backtracking Algorithms**: Stacks are used to keep track of previous states in backtracking algorithms.


## What is Monotonic Stack?
A monotonic stack is a specialized stack data structure that maintains its elements in a specific order, either increasing or decreasing. This property allows for efficient retrieval of the next greater or smaller element in a sequence, making it useful for various algorithmic problems.


```ts
  private stack: number[] = [];

  // Push an element onto the stack while maintaining the monotonic property
  push(value: number): void {
    while (this.stack.length > 0 && this.stack[this.stack.length - 1] < value) {
      this.stack.pop();
    }
    this.stack.push(value);
  }

```