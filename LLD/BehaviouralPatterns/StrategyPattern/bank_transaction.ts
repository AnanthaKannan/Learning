

interface PaymentStrategy {
  processPayment(): void
}


class CreditCard implements PaymentStrategy {
  processPayment(): void {
    console.log('payment processed via credeit card')
  }
}

class DebitCard implements PaymentStrategy {
  processPayment(): void {
    console.log('payment processed via debit credeit card')
  }
}


class Bank {
  private account: PaymentStrategy;

  constructor(account: PaymentStrategy) {
    this.account = account
  }

  payMoney(): void {
    this.account.processPayment() // run time pollyoptimisum
  }
}

const bank = new Bank(new CreditCard())
const bank2 = new Bank(new DebitCard())

bank.payMoney()
bank2.payMoney()