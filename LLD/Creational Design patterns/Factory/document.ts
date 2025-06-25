
/*
Document Creation Application Exercise
You are designing a Document Creation Application that allows users to create different types of documents, such as PDF, Word, and HTML.

Task:
Implement a DocumentFactory that uses the Factory Design Pattern to create instances of various document types based on user input. Ensure that your solution is flexible enough to accommodate new document types in the future.

Output:
After executing the code, it will simulate the following sequence of document creations:
Create a PDF document.
Create a Word document.
Create an HTML document
Each document creation should be clearly reflected in the output, confirming the successful creation of each document type.
*/

interface Documentx {
  convert(text: string): void;
}

class Html implements Documentx {
  convert(text: string): void {
    console.log('Create an HTML document')
  }
}

class Pdf implements Documentx {
  convert(text: string): void {
    console.log('Create a PDF document')
  }
}


class DocumentFactory {
  static createDoc(type: string): Documentx {
    switch (type) {
      case 'pdf':
        return new Pdf()
      case 'html':
        return new Html()
      default:
        throw new Error('Invalid type')
    }
  }
}


// client code
const doc = DocumentFactory.createDoc('pdf')
doc.convert('some text is here')