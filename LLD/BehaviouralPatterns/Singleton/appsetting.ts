class Singleton {
  // Step 1: Private static instance
  private static instance: Singleton;
  private config: Record<string, any>;

  // Step 2: Private constructor to prevent direct instantiation
  private constructor() {
    console.log("Singleton instance created");
    this.config = {
      url: 'http://localhost',
      port: 3000
    }
  }

  // Step 3: Public static method to get the instance
  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

  // Example method
  public getConfig(): Record<string, any> {
    return this.config
  }
}

// Usage
const obj1 = Singleton.getInstance();
console.log(obj1.getConfig())

const obj2 = Singleton.getInstance();

console.log("Are obj1 and obj2 the same?", obj1 === obj2); // true
