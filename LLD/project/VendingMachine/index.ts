/*
Vending Machine – coin insert, product selection, change

* user can add there the money into the system
* add the product
* get the product
*/

class User {
  constructor(public id: number, public name: string, public balance: number = 0) { }
}

class Product {
  constructor(public id: number, public name: string, public count: number, public price: number) { }
}

class Transaction {
  constructor(public id: number, public productId: number, public userId: number, public date: Date) { }
}

class VendingMachine {
  private products: Product[] = [];
  private users: User[] = [];
  private transaction: Transaction[] = [];

  private getUserById(userId: number): User {
    const user = this.users.find((user) => user.id === userId);
    if (!user) throw new Error("404: User not found");
    return user;
  }

  addUser(user: User) {
    this.users.push(user)
    console.log(`User ${user.name} added`)
  }

  addProduct(product: Product) {
    this.products.push(product)
    console.log(`Product ${product.name}, count ${product.count} added`)
  }

  restockItem(productId: number, quantity: number) {
    const product = this.products.find((product) => product.id === productId);
    if (!product) throw new Error("404: Product not found");
    product.count += quantity
  }

  buyProduct(productId: number, userId: number, quantity: number): Transaction {
    const product = this.products.find((p) => p.id === productId)
    if (!product) throw new Error('Invalid product id')
    const user = this.users.find((user) => user.id === userId)
    if (!user) throw new Error("Invalid user id");

    if (product.price > user.balance) {
      throw new Error("User don't have the sufficient balance");
    }
    if (product.count < quantity) {
      throw new Error(`${product.name} avilable only ${product.count}`)
    }

    product.count -= quantity;
    user.balance -= quantity * product.price;
    const transaction = new Transaction(this.products.length + 1, productId, userId, new Date())
    this.transaction.push(transaction)
    console.log(`User bought ${quantity} ${product.name}`)
    return transaction
  }

  addBalance(userId: number, amount: number) {
    const user = this.getUserById(userId);
    user.balance += amount;
  }

  getInventory(): Product[] {
    return this.products
  }

  getRefund(userId: number) {
    const user = this.getUserById(userId);
    const balance = user.balance;
    user.balance = 0;
    return balance
  }
}

const vm = new VendingMachine()
const userId = 500;
const productId = 100
const apple = new Product(productId, 'apple', 3, 25)
const user = new User(userId, 'Bala')

vm.addUser(user)
vm.addProduct(apple)
vm.addBalance(userId, 50)

vm.buyProduct(productId, userId, 2)
try {
  vm.buyProduct(productId, userId, 1)
} catch (e) {
  console.error(e)
}

vm.addBalance(userId, 30)
vm.buyProduct(productId, userId, 1)

console.log(vm.getInventory())
