/*
Library Management
1. books 
2. users
3. checkout
4. return

------ process -------
* user going to visit library
* select the book and check out
* again visit the library and return it back
*/


class User {
  constructor(public id: number, public name: string) { }
}

class Book {
  constructor(public id: number, public name: string, public author: string, public isAvailable: boolean = true) { }
}

class BookRecord {
  constructor(public id: string, public bookId: number, public userId: number, public checkInDate: Date, public checkoutDate: Date | null = null) { }
}

class Library {

  private books: Book[] = []
  private users: User[] = []
  private record: Map<string, BookRecord> = new Map()


  addBook(name: string, author: string): number {
    const id = this.books.length + 1;
    this.books.push(new Book(id, name, author))
    return id
  }

  addUser(name: string): number {
    const id = this.users.length + 1
    this.users.push(new User(id, name))
    return id
  }

  checkOut(userId: number, bookId: number): string | null {
    const user = this.users.find((user) => user.id == userId)
    if (!user) return null
    const book = this.books.find((book) => book.id === bookId)
    if (!book) return null
    if (!book.isAvailable) {
      console.log(`Book ${book.name} is not available`)
      return null
    }

    book.isAvailable = false;
    const id = Math.random().toString(35).slice(3).toUpperCase()
    this.record.set(id, new BookRecord(id, bookId, user.id, new Date()))
    console.log(`User ${user.name} has been check in the book ${book.name}`)
    return id;
  }

  checkIn(recordId: string): void {
    const record = this.record.get(recordId)
    if (!record) return
    record.checkoutDate = new Date()
    const book = this.books.find((book) => book.id === record.bookId)
    if (!book) return

    book.isAvailable = true;
    console.log(`Book ${book.name} has been checked out`)
  }
}

const library = new Library()

// add books
library.addBook('book-a', 'author-a')
const bookId1 = library.addBook('book-b', 'author-b')
const bookId2 = library.addBook('book-c', 'author-c')

// add user
const userId1 = library.addUser('sree')
const userId2 = library.addUser('kannan')

const recordId = library.checkOut(userId1, bookId2)
library.checkOut(userId2, bookId2)
if (recordId) {

  library.checkIn(recordId!)
}

library.checkOut(userId2, bookId2)

