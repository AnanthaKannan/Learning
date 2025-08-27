export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val ?? 0;
    this.left = left ?? null;
    this.right = right ?? null;
  }
}

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export function testData(list: number[]): ListNode | null {
  let head = new ListNode(list[0]);
  let current = head;

  for (let i = 1; i < list.length; i++) {
    current.next = new ListNode(list[i]);
    current = current.next;
  }

  return head;
}