class Queue<T> {
  private queue: T[];

  constructor() {
    this.queue = [];
  }

  public enqueue(elem: T): void {
    this.queue.push(elem);
  }

  public dequeue(): T | undefined {
    return this.queue.shift();
  }

  public front(): T | undefined {
    return this.queue[0];
  }

  public size(): number {
    return this.queue.length;
  }

  public isEmpty(): boolean {
    return this.queue.length === 0;
  }
}
