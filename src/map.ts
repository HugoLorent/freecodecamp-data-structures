class Map<K extends string | number, V> {
  private dictionary: Record<string | number, V>;

  constructor() {
    this.dictionary = {};
  }

  public has(key: K): boolean {
    return Object.hasOwn(this.dictionary, key);
  }

  public add(key: K, value: V): void {
    this.dictionary[key] = value;
  }

  public remove(key: K): void {
    if (this.has(key)) delete this.dictionary[key];
  }

  public get(key: K): V {
    return this.dictionary[key];
  }

  public values(): V[] {
    return Object.values(this.dictionary);
  }

  public size(): number {
    return Object.keys(this.dictionary).length;
  }

  public clear(): void {
    this.dictionary = {};
  }
}
