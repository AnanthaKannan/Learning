import { TreeNode, buildTree } from './util'

function closestNodes(root: TreeNode | null, queries: number[]): number[][] {
  const map: Record<number, number> = {};
  const queryBackup = [...queries]
  for (let i = 0; i < queries.length; i++) {
    map[queries[i]] = i
  }

  queries.sort((a, b) => a - b)

  const result: number[][] = []
  let idx = 0;
  let prev: number = -1;
  const inOrder = (node: TreeNode | null) => {
    let query = queries[idx]
    if (!node) return
    inOrder(node.left)
    // console.log('------------', node.val)
    if (queries.length > idx) {
      if (query === node.val) {
        result[map[queries[idx]]] = [node.val, node.val]
        idx++
      } else {

        query = queries[idx]
        while (prev <= query && query <= node.val) {
          result[map[queries[idx]]] = [prev, node.val]
          if (query === node.val) {
            result[map[queries[idx]]] = [node.val, node.val]
          }

          idx++;
          query = queries[idx]
        }
      }
    }
    prev = node.val
    inOrder(node.right)
  }


  inOrder(root)

  for (let i = 0; i < queries.length; i++) {
    if (!result[i]) {
      if (prev < queryBackup[i])
        result[i] = [prev, -1]
      else
        result[i] = [-1, -1]
    }
  }

  // console.log('----------', prev)
  return result
};

// const tree = buildTree([6, 2, 13, 1, 4, 9, 15, null, null, null, null, null, null, 14])
// console.log(JSON.stringify(closestNodes(tree, [2, 5, 16]), null, 2))

const tree = buildTree([4, null, 9])
console.log(JSON.stringify(closestNodes(tree, [3]), null, 2))

// const tree = buildTree([16, 14, null, 4, 15, 1])
// console.log(JSON.stringify(closestNodes(tree, [10, 6, 2, 9]), null, 2))
