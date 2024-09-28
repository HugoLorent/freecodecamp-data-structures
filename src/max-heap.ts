class MaxHeap {
  private heap: number[];

  constructor() {
    this.heap = [];
  }

  insert(value: number): void {
    this.heap.push(value);

    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex] >= this.heap[index]) {
        break;
      }
      [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
      index = parentIndex;
    }
  }

  print(): number[] {
    return this.heap;
  }

  remove(): number | null {
    if (this.heap.length === 0) {
      return null;
    }

    const maxValue = this.heap[0];
    const lastValue = this.heap.pop()!;

    if (this.heap.length > 0) {
      this.heap[0] = lastValue;
      this.heapifyDown(0);
    }

    return maxValue;
  }

  private heapifyDown(index: number): void {
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;
    let largestIndex = index;

    if (leftChildIndex < this.heap.length && this.heap[leftChildIndex] > this.heap[largestIndex]) {
      largestIndex = leftChildIndex;
    }

    if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] > this.heap[largestIndex]) {
      largestIndex = rightChildIndex;
    }

    if (largestIndex !== index) {
      [this.heap[index], this.heap[largestIndex]] = [this.heap[largestIndex], this.heap[index]];
      this.heapifyDown(largestIndex);
    }
  }
}
