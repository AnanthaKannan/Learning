1. What is a Tree?
A Tree is a non-linear data structure used to represent hierarchical relationships.
Think: family tree, organization chart, folder structure in your computer.
<br>
A tree is made of:
* Nodes → each node stores data
* Edges → connections between nodes

```js
        A
       / \
      B   C
     / \   \
    D   E   F
```
* A is the root
* B, C are children of A
* D, E, F are leaf nodes (no children)

## Key terms
| Term           | Meaning                                     |
| -------------- | ------------------------------------------- |
| Root           | The topmost node                            |
| Parent         | Node that has child(ren)                    |
| Child          | Node connected below a parent               |
| Leaf           | Node with no children                       |
| Depth of node  | Distance from root                          |
| Height of tree | Max depth of any node                       |
| Subtree        | Tree formed by any node and its descendants |

## Types of Trees
* General Tree → any number of children per node
* Binary Tree → each node has at most 2 children
* Full Binary Tree → every node has 0 or 2 children
* Complete Binary Tree → all levels filled except possibly last, which  is filled from left
* Perfect Binary Tree → full & complete
* Binary Search Tree (BST) → left < root < right for every node
* AVL Tree, Red-Black Tree → self-balancing BSTs
* Heap → complete binary tree with heap property (max or min)

## Stage 2: Traversals (DFS + BFS)
1. DFS (Depth-first search) (Recursive)
   * Preorder: Root → Left → Right
   * Inorder: Left → Root → Right
   * Postorder: Left → Right → Root
2. BFS (Breadth First Search) (Level Order)
   * Use a queue to visit level by level.


## Difference between Tree, Binary Tree, BST
### Tree (General Tree)
Definition: A hierarchical data structure consisting of nodes, where:
* There’s a single root node at the top.
* Each node can have any number of children (0, 1, 2, …).
* There are no cycles (no loops).
```
      A
    / | \
   B  C  D
     / \
    E   F
```
Key points:
* Most flexible — no fixed limit on children per node.
* Often used for representing hierarchical data (e.g., file systems, organizational charts).

### Binary Tree
Definition: A tree where each node has at most two children, usually called:
* Left child
* Right child
```
      A
     / \
    B   C
   / \   \
  D   E   F

```
Key points:
* “At most two children” — so a node may have 0, 1, or 2 children.
* Not necessarily ordered.
* Used in heaps, expression trees, etc.

### Binary Search Tree (BST)
Definition: A binary tree with an ordering rule:
* Left subtree contains values less than the node’s value.
* Right subtree contains values greater than the node’s value.
```
      8
     / \
    3   10
   / \    \
  1   6    14
     / \   /
    4   7 13
```
Key points:
* Enables efficient search, insertion, and deletion in O(log n) on average.
* In-order traversal gives a sorted list.
* Must maintain the ordering property after every operation.

| Feature               | Tree              | Binary Tree                     | Binary Search Tree        |
| --------------------- | ----------------- | ------------------------------- | ------------------------- |
| Max children per node | Unlimited         | ≤ 2                             | ≤ 2                       |
| Ordered?              | No                | No                              | Yes (Left < Node < Right) |
| Main use              | General hierarchy | Structured binary relationships | Fast searching/sorting    |
| Example use case      | File system       | Expression tree                 | Database indexing         |

## Practice Order (TypeScript-Friendly)
* Build & traverse a simple Binary Tree ✅
* Write DFS in all 3 orders (recursive + iterative)
* Write BFS using queue
* Build a BST with insert & search
* Solve 5 Easy → 5 Medium problems on LeetCode



### Reference Post-Order traversal 
```ts
function maxDepth(root: TreeNode | null): number {
    if (root === null) return 0; // Empty tree has depth 0
    
    // 1 + the max depth of left or right subtree
    const left = maxDepth(root.left);
    const right = maxDepth(root.right);
    return 1 + Math.max(left, right);
}

const tree = new TreeNode(1,
    new TreeNode(2), new TreeNode(3))

maxDepth(tree)
```

### Reference In-Order Traversal
It will iterate ascending order, if the tree is binary.
```ts
// Example-1
function dfs(node: TreeNode | null) {
        if (!node) return;
        dfs(node.left);        // Visit left
        result.push(node.val); // Visit node
        dfs(node.right);       // Visit right
    }

```

### BFS Reference
```ts
function minDepth(root: TreeNode | null): number {
    if (!root) return 0;

    const queue: [TreeNode, number][] = [[root, 1]];

    while (queue.length > 0) {
        const [node, depth] = queue.shift()!;

        // If leaf node, return depth
        if (!node.left && !node.right) {
            return depth;
        }

        if (node.left) {
            queue.push([node.left, depth + 1]);
        }
        if (node.right) {
            queue.push([node.right, depth + 1]);
        }
    }

    return 0; // Should never be reached
}
```

### Code reference - 1
```ts
function mergeTrees(root1: TreeNode | null, root2: TreeNode | null): TreeNode | null {
  if (!root1 && !root2) return null;
  if (!root1) return root2;
  if (!root2) return root1;

  const merged = new TreeNode(root1.val + root2.val);
  merged.left = mergeTrees(root1.left, root2.left);
  merged.right = mergeTrees(root1.right, root2.right);
  return merged;
}

const t1 = new TreeNode(1, new TreeNode(3, new TreeNode(5)), new TreeNode(2));
const t2 = new TreeNode(2, new TreeNode(1, null, new TreeNode(4)), new TreeNode(3, null, new TreeNode(7)));

const mergedTree = mergeTrees(t1, t2);

```