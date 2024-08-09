class CircularQueue<T> {
  private circularQueue: (T | null)[];
  private read: number;
  private write: number;
  private max: number;

  constructor(size: number) {
    this.circularQueue = new Array<T | null>(size).fill(null, 0, size);
    this.read = 0;
    this.write = 0;
    this.max = size - 1;
  }

  public print(): (T | null)[] {
    return this.circularQueue;
  }

  public enqueue(elem: T): T | null {
    if (this.circularQueue[this.write] === null) {
      this.circularQueue[this.write++] = elem;

      if (this.write > this.max) {
        this.write = 0;
      }
      return elem;
    }
    return null;
  }

  public dequeue(): T | null {
    if (this.circularQueue[this.read] != null) {
      const elem = this.circularQueue[this.read];
      this.circularQueue[this.read++] = null;
      if (this.read > this.max) {
        this.read = 0;
      }
      return elem;
    }
    return null;
  }
}
