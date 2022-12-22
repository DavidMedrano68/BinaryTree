import Node from "./node.js";
import Queue from "./queue.js";
export default class Tree {
  constructor() {
    this.root = null;
  }
  changeTree(arr) {
    this.root = this.buildTree(arr);
  }
  buildTree(arr) {
    let start = 0;
    let end = arr.length - 1;
    if (start > end) {
      return null;
    }
    let mid = Math.floor((start + end) / 2);
    let leftArr = arr.slice(start, mid);
    let rightArr = arr.slice(mid + 1);
    let root = new Node(arr[mid]);
    root.setLeft(this.buildTree(leftArr));
    root.setRight(this.buildTree(rightArr));
    return root;
  }
  prettyPrint(node, prefix = "", isLeft = true) {
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
  getRoot() {
    return this.root;
  }
  find(value) {
    if (this.root.data === value) {
      return this.root;
    }
    if (this.root.data > value) {
      let currentLeft = this.root.left;
      while (currentLeft !== null) {
        if (currentLeft.data == value) {
          return currentLeft;
        }
        if (currentLeft.data > value) {
          currentLeft = currentLeft.left;
        }
        if (currentLeft.data < value) {
          currentLeft = currentLeft.right;
        }
      }
      return "not in tree";
    }
    if (this.root.data < value) {
      let currentRight = this.root.right;
      while (currentRight !== null) {
        if (currentRight.data == value) {
          return currentRight;
        }
        if (currentRight.data < value) {
          currentRight = currentRight.right;
        }
        if (currentRight.data > value) {
          currentRight = currentRight.left;
        }
      }
      return "not in tree";
    }
  }
  insert(data) {
    this.root = this.insertRec(this.root, data);
  }
  insertRec(root, data) {
    if (root == null) {
      root = new Node(data);
      return root;
    }
    if (data < root.data) {
      root.left = this.insertRec(root.left, data);
    } else if (data > root.data) {
      root.right = this.insertRec(root.right, data);
    }
    return root;
  }
  delete(data) {
    this.root = this.deleteRec(this.root, data);
  }
  deleteRec(root, data) {
    if (root == null) {
      return root;
    }
    if (root.data > data) {
      root.left = this.deleteRec(root.left, data);
    } else if (root.data < data) {
      root.right = this.deleteRec(root.right, data);
    } else {
      if (!root.right && !root.left) {
        return null;
      }
      if (!root.right) {
        return root.left;
      } else if (!root.left) {
        return root.right;
      }
      root.data = this.min(root.right);
      root.right = this.deleteRec(root.right, root.data);
    }
    return root;
  }
  min(root) {
    let minVal = root.data;
    while (root.left !== null) {
      minVal = root.left.data;
      root = root.left;
    }
    return minVal;
  }
  levelOrder() {
    return this.level(this.root);
  }
  level(root) {
    if (!root) {
      return null;
    }
    const queue = new Queue();
    let results = [];
    queue.enqueue(root);
    while (queue.length()) {
      let node = queue.dequeue();
      results.push(node.data);
      if (node.left) {
        queue.enqueue(node.left);
      }
      if (node.right) {
        queue.enqueue(node.right);
      }
    }
    return results;
  }
  rootPreOrder() {
    return this.preOrder(this.root);
  }
  preOrder(root, result = []) {
    if (!root) {
      return;
    }
    result.push(root.data);
    this.preOrder(root.left, result);
    this.preOrder(root.right, result);
    return result;
  }
  rootInOrder() {
    return this.inOrder(this.root);
  }
  inOrder(root, result = []) {
    if (!root) {
      return;
    }
    this.inOrder(root.left, result);
    result.push(root.data);
    this.inOrder(root.right, result);
    return result;
  }
  rootPostOrder() {
    return this.postOrder(this.root);
  }
  postOrder(root, result = []) {
    if (!root) {
      return;
    }
    this.postOrder(root.left, result);
    this.postOrder(root.right, result);
    result.push(root.data);
    return result;
  }
  height(root) {
    if (!root) {
      return 0;
    }
    let leftDepth = this.height(root.left);
    let rightDepth = this.height(root.right);
    if (leftDepth > rightDepth) {
      return leftDepth + 1;
    } else {
      return rightDepth + 1;
    }
  }
  depth(value, root = this.root, count = 0) {
    if (root === null) return;
    if (root.data === value) return count;
    if (root.data < value) {
      return this.depth(value, root.right, count + 1);
    } else {
      return this.depth(value, root.left, count + 1);
    }
  }
  isBalanced() {
    if (!this.root) {
      return "Tree is empty";
    }
    const possibleAnswers = [-1, 0, 1];
    let rightHeight = this.height(this.root.right);
    let leftHeight = this.height(this.root.left);
    return possibleAnswers.includes(rightHeight - leftHeight);
  }
  rebalance() {
    if (this.isBalanced()) {
      return "tree is already balanced";
    }
    this.changeTree(this.rootInOrder());
  }
}
// let array = [0, 1, 2, 3, 4];
// let tree = new Tree();
// tree.buildTree(array);
// tree.insert(-2);
// tree.insert(5);
// tree.insert(8);
// tree.insert(9);
// let right = tree.getRoot();
// console.log(right);
// tree.delete(2);
// console.log(tree.levelOrder());
// console.log(tree.rootPreOrder());
// console.log(tree.rootInOrder());
// console.log(tree.rootPostOrder());
// console.log(tree.height(tree.getRoot()));
// console.log(tree.isBalanced());
