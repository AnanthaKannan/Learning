
class Animal {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  makeSound(): void {
    console.log('Some generic sound')
  }

}

class Dog extends Animal {

  constructor(name: string) {
    super(name)
  }

  public makeSound() {
    console.log('Woof!')
  }
}


class Cat extends Animal {

  constructor(name: string) {
    super(name)
  }

  public makeSound() {
    console.log('Meow!')
  }
}