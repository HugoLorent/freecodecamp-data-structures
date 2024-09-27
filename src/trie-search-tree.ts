class Node {
  public keys: Map<string, Node>;
  public end: boolean;

  constructor() {
    this.keys = new Map();
    this.end = false;
  }
}

class Trie {
  private root: Node;

  constructor() {
    this.root = new Node();
  }

  public add(word: string): void {
    let currentNode = this.root;
    for (let char of word) {
      if (!currentNode.keys.has(char)) {
        currentNode.keys.set(char, new Node());
      }
      currentNode = currentNode.keys.get(char)!;
    }
    currentNode.end = true;
  }

  public isWord(word: string): boolean {
    let currentNode = this.root;
    for (let char of word) {
      if (!currentNode.keys.has(char)) {
        return false;
      }
      currentNode = currentNode.keys.get(char)!;
    }
    return currentNode.end;
  }

  public print(): string[] {
    const words: string[] = [];
    this._print(this.root, '', words);
    return words;
  }

  private _print(node: Node, prefix: string, words: string[]) {
    if (node.end) {
      words.push(prefix);
    }
    for (let [char, childNode] of node.keys) {
      this._print(childNode, prefix + char, words);
    }
  }
}
