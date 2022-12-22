export default class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
  setLeft(leftNode) {
    this.left = leftNode;
  }
  setRight(rightNode) {
    this.right = rightNode;
  }
}
