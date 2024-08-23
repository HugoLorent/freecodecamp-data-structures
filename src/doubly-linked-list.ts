class Node<T> {
  private element: T;
  private next: Node<T> | null;
  private previous: Node<T> | undefined;

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

  public setNext(elem: Node<T> | null): void {
    this.next = elem;
  }

  public getPrevious(): Node<T> | undefined {
    return this.previous;
  }

  public setPrevious(elem: Node<T> | undefined): void {
    this.previous = elem;
  }
}

class DoublyLinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  public add(elem: T): void {
    const newNode = new Node(elem);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      const oldTail = this.tail;
      this.tail = newNode;
      oldTail?.setNext(newNode);
      this.tail.setPrevious(oldTail as Node<T>);
    }
  }

  public remove(elem: T): null | undefined {
    if (this.head === null) return null;

    if (this.head.getElement() === elem) {
      const oldHead = this.head;
      this.head = oldHead.getNext();
      this.head?.setPrevious(oldHead.getPrevious());
    }

    let current = this.head?.getNext();
    while (current?.getNext() !== null) {
      if (current?.getElement() === elem) {
        current.getPrevious()?.setNext(current.getNext() as Node<T>);
        current.getNext()?.setPrevious(current.getPrevious());
      }
      current = current?.getNext();
    }

    if (this.tail?.getElement() === elem) {
      const oldTail = this.tail;
      this.tail = oldTail.getPrevious() as Node<T>;
      this.tail.setNext(oldTail.getNext());
    }
  }

  public reverse(): null | undefined {
    let temp = null;
    let currentNode = this.head;

    if (this.head === null) {
      return null;
    }

    this.tail = currentNode;

    while (currentNode) {
      temp = currentNode.getPrevious();
      currentNode.setPrevious(currentNode.getNext() as Node<T>);
      currentNode.setNext(temp as Node<T>);
      currentNode = currentNode.getPrevious() as Node<T>;
    }
    if (temp != null) {
      this.head = temp.getPrevious() as Node<T>;
    }
  }
}
