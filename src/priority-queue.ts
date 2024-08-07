class PriorityQueue<T> {
  private priorityQueue: [T, number][];

  constructor() {
    this.priorityQueue = [];
  }

  public enqueue(elem: [T, number]): void {
    const elemPriority = elem[1];
    for (let i = 0; i < this.priorityQueue.length; i++) {
      if (elemPriority < this.priorityQueue[i][1]) {
        this.priorityQueue = [...this.priorityQueue.slice(0, i), elem, ...this.priorityQueue.slice(i)];
        return;
      }
    }
    this.priorityQueue.push(elem);
  }

  public dequeue(): T | undefined {
    return this.priorityQueue.shift()![0];
  }

  public size(): number {
    return this.priorityQueue.length;
  }

  public front(): T {
    return this.priorityQueue[0][0];
  }

  public isEmpty(): boolean {
    return this.priorityQueue.length === 0;
  }
}
