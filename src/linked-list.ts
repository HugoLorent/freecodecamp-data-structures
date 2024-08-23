class Node<T> {
  private element: T;
  private next: Node<T> | null;

  constructor(element: T) {
    this.element = element;
    this.next = null;
  }

  public getElement(): T {
    return this.element;
  }

  public getNext(): Node<T> | null {
    return this.next;
  }

  public setNext(elem: Node<T>): void {
    this.next = elem;
  }
}

class LinkedList<T> {
  private head: Node<T> | null;
  private length: number;

  constructor() {
    this.head = null;
    this.length = 0;
  }

  public getHead(): Node<T> | null {
    return this.head;
  }

  public size(): number {
    return this.length;
  }

  public add(elem: T): void {
    const node = new Node(elem);
    if (this.head === null) {
      this.head = node;
    } else {
      let curr: Node<T> | null = this.head;
      while (curr?.getNext() !== null) {
        curr = curr?.getNext() as Node<T> | null;
      }
      curr.setNext(node);
    }
    this.length++;
  }

  public remove(elem: T): void {
    if (this.head?.getElement() === elem) {
      this.head = this.head.getNext();
      this.length--;
    } else {
      let previous = this.head;
      while (previous) {
        const current = previous.getNext();
        if (current) {
          if (current.getElement() === elem) {
            previous.setNext(current.getNext() as Node<T>);
            this.length--;
            return;
          }
        }
        previous = current;
      }
    }
  }

  public isEmpty(): boolean {
    return this.head === null;
  }

  public indexOf(elem: T): number {
    if (this.head?.getElement() === elem) {
      return 0;
    } else {
      let index = 1;
      let current = this.head?.getNext();
      while (current !== null) {
        if (current?.getElement() === elem) {
          return index;
        }
        current = current?.getNext();
        index++;
      }
    }
    return -1;
  }

  public elementAt(index: number): T | undefined {
    if (index === 0) {
      return this.head?.getElement();
    } else {
      let indexCount = 1;
      let current = this.head?.getNext();
      while (current !== null) {
        if (index === indexCount) {
          return current?.getElement();
        }
        current = current?.getNext();
        indexCount++;
      }
    }
    return undefined;
  }

  public removeAt(index: number): T | null {
    if (index === 0) {
      const tmpHead = this.head?.getElement() as T | null;
      this.head = this.head?.getNext() as Node<T> | null;
      this.length--;
      return tmpHead;
    } else {
      let indexCount = 1;
      let previous = this.head;
      while (previous) {
        const current = previous.getNext();
        if (current) {
          if (index === indexCount) {
            previous.setNext(current.getNext() as Node<T>);
            this.length--;
            return current.getElement();
          }
        }
        previous = current;
        indexCount++;
      }
    }
    return null;
  }

  public addAt(index: number, elem: T): boolean {
    if (index < 0 || index > this.length) {
      return false;
    }

    if (index === 0) {
      const newNode = new Node<T>(elem);
      newNode.setNext(this.head as Node<T>);
      this.head = newNode;
    } else {
      let node = this.head;
      let i = 0;
      while (i < index - 1) {
        node = node?.getNext() as Node<T>;
        i++;
      }
      const newNode = new Node<T>(elem);
      newNode.setNext(node?.getNext() as Node<T>);
      node?.setNext(newNode);
    }

    this.length++;
    return true;
  }
}
