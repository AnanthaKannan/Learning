/*
FlexiText Formatter Application Exercise
You are designing a text editor application that enables users to format their documents using different styles, such as Plain Text, HTML, and Markdown. Each formatting style transforms the document’s content in its own unique way. The application should allow users to switch between these formatting styles at runtime, with the ability to easily incorporate new formatting styles in the future.

Formatting Specifications:
Plain Text: Return the text as it is.
HTML Formatting: Return the text enclosed between <html><body> and </body></html>.
Markdown Formatting: Return the text enclosed between ** and **.

Task:
Implement the formatting functionality using the Strategy Design Pattern to ensure flexibility and maintainability. Your solution should allow users to apply various text formatting strategies while making it easy to add new formats without changing the existing logic.

Output:
Your application should apply three different formatting strategies: Plain Text, HTML, and Markdown to the same document. The formatted output should be displayed for each strategy.
*/

interface Format {
  formatText(text: string): void
}

class HtmlFormat implements Format {
  formatText(text: string): void {
    console.log(`<html><body> ${text} </body></html>`);
  }
}

class MarkDownFormat implements Format {
  formatText(text: string): void {
    console.log(`**${text}**`);
  }
}

class TextEditor {
  public format!: Format;
  public text: string;

  constructor(text: string) {
    this.text = text
  }

  setFormat(format: Format) {
    this.format = format;
  }


  formatText() {
    this.format.formatText(this.text)
  }
}

const md = new MarkDownFormat()
const html = new HtmlFormat()

const textEditor = new TextEditor('eeeeeeeeeeeee')
textEditor.setFormat(md)
textEditor.formatText()

textEditor.setFormat(html)
textEditor.formatText()

