# Linked List
## Single Linked list
* Navigation if forward only

## Double Linked List
* Forward and backward navigation is possible

## Circular Liked list
* last element is linked to the first element


## Note

```js
// needs to memories the lines
let current = head

{
  current.next = new ListNode() // this value update into the head
  current = current.next // this will iterate to the next node
}
```

## Revers the linked list
```js
  let current = head;
  let prev: ListNode | null = null;
  while (current) {
    let nexNode = current.next;
    current.next = prev;
    prev = current
    current = nexNode;
  }
  console.log(prev)
```


