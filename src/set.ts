class Set<T extends string | number> {
  private dictionary: Record<string | number, T>;
  private length;

  constructor() {
    this.dictionary = {};
    this.length = 0;
  }

  public has(elem: T): boolean {
    return this.dictionary[elem] !== undefined;
  }

  public values(): T[] {
    return Object.values(this.dictionary);
  }

  public add(elem: T): boolean {
    if (!this.has(elem)) {
      this.dictionary[elem] = elem;
      this.length++;
      return true;
    } else {
      return false;
    }
  }

  public remove(elem: T): boolean {
    if (this.has(elem)) {
      delete this.dictionary[elem];
      this.length--;
      return true;
    } else {
      return false;
    }
  }

  public size(): number {
    return this.length;
  }

  public union(set: Set<T>): Set<T> {
    const newSet = new Set<T>();
    this.values().forEach((key) => newSet.add(this.dictionary[key]));
    set.values().forEach((elem) => newSet.add(elem));
    return newSet;
  }

  public intersection(set: Set<T>): Set<T> {
    const newSet = new Set<T>();
    this.values().forEach((elem) => {
      set.values().forEach((elem2) => {
        if (elem === elem2) {
          newSet.add(elem);
        }
      });
    });
    return newSet;
  }

  public difference(set: Set<T>): Set<T> {
    const newSet = new Set<T>();
    this.values().forEach((elem) => {
      if (!set.has(elem)) {
        newSet.add(elem);
      }
    });
    return newSet;
  }

  public isSubsetOf(set: Set<T>): boolean {
    for (const elem of this.values()) {
      if (!set.has(elem)) {
        return false;
      }
    }
    return true;
  }
}
