class Node<T> {
  public element: T;
  public left: Node<T> | null;
  public right: Node<T> | null;

  constructor(element: T) {
    this.element = element;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree<T> {
  private root: Node<T> | null;

  constructor() {
    this.root = null;
  }

  public add(elem: T): void {
    const node = new Node(elem);
    if (this.root === null) {
      this.root = node;
    } else {
      let curr: Node<T> | null = this.root;
      let parent: Node<T> | null = null;
      while (curr) {
        parent = curr;
        if (elem < curr.element) {
          curr = curr.left;
        } else {
          curr = curr.right;
        }
      }
      if (elem < parent!.element) {
        parent!.left = node;
      } else {
        parent!.right = node;
      }
    }
  }

  public findMin(): Node<T> | null {
    if (this.root === null) {
      return null;
    }
    let curr: Node<T> | null = this.root;
    while (curr?.left) {
      curr = curr.left;
    }
    return curr;
  }

  public findMax(): Node<T> | null {
    if (this.root === null) {
      return null;
    }
    let curr: Node<T> | null = this.root;
    while (curr?.right) {
      curr = curr.right;
    }
    return curr;
  }

  public isPresent(elem: T): boolean {
    let curr: Node<T> | null = this.root;
    while (curr) {
      if (curr.element === elem) {
        return true;
      } else if (elem < curr.element) {
        curr = curr.left;
      } else {
        curr = curr.right;
      }
    }
    return false;
  }

  public findMinHeight(): number {
    if (this.root === null) {
      return -1;
    }
    let curr: Node<T> | null = this.root;
    let height = 0;
    while (curr) {
      curr = curr.left;
      height++;
    }
    return height;
  }

  public findMaxHeight(): number {
    if (this.root === null) {
      return -1;
    }
    let curr: Node<T> | null = this.root;
    let height = 0;
    while (curr) {
      curr = curr.right;
      height++;
    }
    return height;
  }

  public isBalanced(): boolean {
    if (this.root === null) {
      return true;
    }
    const result = this.findMaxHeight() - this.findMinHeight();
    if (Math.abs(result) > 1) {
      return false;
    } else {
      return true;
    }
  }

  public inorder(): T[] | null {
    const result: T[] = [];
    this.inorderHelper(this.root, result);
    return result.length ? result : null;
  }

  private inorderHelper(node: Node<T> | null, result: T[]): void {
    if (node) {
      this.inorderHelper(node.left, result);
      result.push(node.element);
      this.inorderHelper(node.right, result);
    }
  }

  public preorder(): T[] | null {
    const result: T[] = [];
    this.preorderHelper(this.root, result);
    return result.length ? result : null;
  }

  private preorderHelper(node: Node<T> | null, result: T[]): void {
    if (node) {
      result.push(node.element);
      this.preorderHelper(node.left, result);
      this.preorderHelper(node.right, result);
    }
  }

  public postorder(): T[] | null {
    const result: T[] = [];
    this.postorderHelper(this.root, result);
    return result.length ? result : null;
  }

  private postorderHelper(node: Node<T> | null, result: T[]): void {
    if (node) {
      this.postorderHelper(node.left, result);
      this.postorderHelper(node.right, result);
      result.push(node.element);
    }
  }

  public levelOrder(): T[] {
    const result: T[] = [];
    if (!this.root) return result;

    const queue: Node<T>[] = [this.root];
    while (queue.length) {
      const levelSize = queue.length;
      for (let i = 0; i < levelSize; i++) {
        const node = queue.shift() as Node<T>;
        result.push(node.element);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
    }
    return result;
  }

  public reverseLevelOrder(): T[] {
    const result: T[] = [];
    if (!this.root) return result;

    const queue: Node<T>[] = [this.root];
    while (queue.length) {
      const levelSize = queue.length;
      const levelValues: T[] = [];
      for (let i = 0; i < levelSize; i++) {
        const node = queue.shift() as Node<T>;
        levelValues.push(node.element);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
      result.unshift(...levelValues);
    }
    return result;
  }

  public remove(value: T): Node<T> | null {
    const nodeToRemove = this.findNode(value);
    if (!nodeToRemove) return null;

    const parent = this.findParent(nodeToRemove);
    const childrenCount = this.countChildren(nodeToRemove);

    if (childrenCount === 0) {
      this.removeLeafNode(parent, nodeToRemove);
    } else if (childrenCount === 1) {
      this.removeNodeWithOneChild(parent, nodeToRemove);
    } else {
      this.removeNodeWithTwoChildren(nodeToRemove);
    }

    return nodeToRemove;
  }

  private findNode(value: T): Node<T> | null {
    let current: Node<T> | null = this.root;
    while (current) {
      if (current.element === value) return current;
      if (value < current.element) current = current.left;
      else current = current.right;
    }
    return null;
  }

  private findParent(node: Node<T>): Node<T> | null {
    let current: Node<T> | null = this.root;
    while (current) {
      if (current.left === node || current.right === node) return current;
      if (node.element < current.element) current = current.left;
      else current = current.right;
    }
    return null;
  }

  private countChildren(node: Node<T>): number {
    let count = 0;
    if (node.left) count++;
    if (node.right) count++;
    return count;
  }

  private removeLeafNode(parent: Node<T> | null, nodeToRemove: Node<T>): void {
    if (!parent) {
      this.root = null;
    } else if (parent.left === nodeToRemove) {
      parent.left = null;
    } else {
      parent.right = null;
    }
  }

  private removeNodeWithOneChild(parent: Node<T> | null, nodeToRemove: Node<T>): void {
    const child = nodeToRemove.left || nodeToRemove.right;
    if (!parent) {
      this.root = child;
    } else if (parent.left === nodeToRemove) {
      parent.left = child;
    } else {
      parent.right = child;
    }
  }

  private removeNodeWithTwoChildren(nodeToRemove: Node<T>): void {
    const successor = this.findSuccessor(nodeToRemove);
    const successorParent = this.findParent(successor);

    if (successorParent === nodeToRemove) {
      // If the successor is the right child of the node to remove
      if (nodeToRemove.right === successor) {
        successor.left = nodeToRemove.left;
      } else {
        // If the successor is the left child of the node to remove (this case is not possible in a BST)
        throw new Error('Invalid BST');
      }
    } else {
      // If the successor is not the right child of the node to remove
      successorParent!.left = successor.right;
      successor.left = nodeToRemove.left;
      successor.right = nodeToRemove.right;
    }

    const parent = this.findParent(nodeToRemove);
    if (!parent) {
      this.root = successor;
    } else if (parent.left === nodeToRemove) {
      parent.left = successor;
    } else {
      parent.right = successor;
    }
  }

  private findSuccessor(node: Node<T>): Node<T> {
    let current: Node<T> | null = node.right;
    while (current && current.left) {
      current = current.left;
    }
    return current as Node<T>;
  }

  public invert(): void {
    this.invertRecursive(this.root);
  }

  private invertRecursive(node: Node<T> | null): Node<T> | null {
    if (!node) return null;

    const temp = node.left;
    node.left = this.invertRecursive(node.right);
    node.right = this.invertRecursive(temp);
    return node;
  }
}
