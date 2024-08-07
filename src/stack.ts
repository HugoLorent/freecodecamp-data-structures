class Stack<T> {
  private stack: T[];

  constructor() {
    this.stack = [];
  }

  public push(elem: T): void {
    this.stack.push(elem);
  }

  public pop(): T | undefined {
    return this.stack.pop();
  }

  public peek(): T | undefined {
    return this.stack[this.stack.length - 1];
  }

  public isEmpty(): boolean {
    return this.stack.length === 0;
  }

  public clear(): void {
    this.stack = [];
  }
}
