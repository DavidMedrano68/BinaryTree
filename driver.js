import Tree from "./tree.js";
const tree = new Tree();
const randomArray = [0, 1, 4, 6, 8, 10, 11];
console.log(tree.changeTree(randomArray));
console.log(tree.isBalanced());
tree.prettyPrint(tree.getRoot());
tree.insert(12);
tree.insert(30);
console.log(tree.isBalanced());
tree.prettyPrint(tree.getRoot());
console.table({
  level: tree.levelOrder(),
  post: tree.rootPostOrder(),
  preOrder: tree.rootPreOrder(),
  inOrder: tree.rootInOrder(),
});
tree.rebalance();
tree.prettyPrint(tree.getRoot());
console.log(tree.isBalanced());
console.table({
  level: tree.levelOrder(),
  post: tree.rootPostOrder(),
  preOrder: tree.rootPreOrder(),
  inOrder: tree.rootInOrder(),
});
