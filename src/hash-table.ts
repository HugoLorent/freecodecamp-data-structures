let called = 0;
const hash = (string: string): number => {
  called++;
  let hashed = 0;
  for (let i = 0; i < string.length; i++) {
    hashed += string.charCodeAt(i);
  }
  return hashed;
};

class HashTable<T> {
  private dictionary: { [key: number]: { [key: string]: T } };

  constructor() {
    this.dictionary = {};
  }

  public add(key: string, value: T): void {
    const hashedKey = hash(key);
    this.dictionary[hashedKey] = this.dictionary[hashedKey] || {};
    this.dictionary[hashedKey][key] = value;
  }

  public remove(key: string): void {
    const hashedKey = hash(key);
    delete this.dictionary[hashedKey][key];
    if (Object.keys(this.dictionary[hashedKey]).length === 0) {
      delete this.dictionary[hashedKey];
    }
  }

  public lookup(key: string): T {
    const hashedKey = hash(key);
    return this.dictionary[hashedKey][key];
  }
}
