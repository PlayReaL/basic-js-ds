const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    let newNode = new Node(data);

    if (this.rootNode === null) {
      this.rootNode = newNode;
      return;
    }

    let currentNode = this.rootNode;

    while (true) {
      if (data < currentNode.data) {
        if (currentNode.left === null) {
          currentNode.left = newNode;
          return;
        }
        currentNode = currentNode.left;
      } else {
        if (currentNode.right === null) {
          currentNode.right = newNode;
          return;
        }
        currentNode = currentNode.right;
      }
    }
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    let currentNode = this.rootNode;

    while (currentNode !== null) {
      if (currentNode.data === data) {
        return currentNode;
      }

      if (currentNode.data > data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return null;
  }

  remove(data, node = this.rootNode) {
    if (node === null) {
      return null;
    }

    if (node.data === data) {
      if (node.left === null && node.right === null) {
        return null;
      } else if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      const minData = this.min(node.right);
      node.data = minData;
      node.right = this.remove(minData, node.right);
    }

    if (node.data > data) {
      node.left = this.remove(data, node.left);
    } else {
      node.right = this.remove(data, node.right);
    }

    return node;
  }

  min(currentNode = this.rootNode) {
    while (currentNode.left !== null) {
      currentNode = currentNode.left;
    }
    return currentNode.data !== null ? currentNode.data : null;
  }

  max() {
    let currentNode = this.rootNode;

    while (currentNode.right !== null) {
      currentNode = currentNode.right;
    }
    return currentNode.data !== null ? currentNode.data : null;
  }
}

module.exports = {
  BinarySearchTree,
};
