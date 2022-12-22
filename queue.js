export default class Queue {
  constructor() {
    this.arr = [];
  }
  enqueue(newElem) {
    this.arr.push(newElem);
  }
  dequeue() {
    return this.arr.shift();
  }
  array() {
    return this.arr;
  }
  map() {
    return this.arr.map((node) => node.data);
  }
  length() {
    return this.arr.length;
  }
}
