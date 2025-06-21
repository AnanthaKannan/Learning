class TextEditorMemento {
  private content: string;

  constructor(content: string) {
    this.content = content;
  }

  getContent(): string {
    return this.content;
  }
}

class Caretaker {
  private history: TextEditorMemento[] = [];

  setState(editor: TextEditor): void {
    this.history.push(new TextEditorMemento(editor.getContent()));
  }

  undo(editor: TextEditor): void {
    if (this.history.length <= 1) return;
    this.history.pop();
    editor.reset(this.history[this.history.length - 1]);
  }
}

class TextEditor {
  private content: string = "";

  getContent(): string {
    return this.content;
  }

  write(content: string): void {
    this.content = content;
  }

  reset(memento: TextEditorMemento): void {
    this.content = memento.getContent();
  }
}

// Usage
const editor = new TextEditor();
const caretaker = new Caretaker();

editor.write('Hello world 1');
caretaker.setState(editor);

editor.write('Hello world 2');
caretaker.setState(editor);

editor.write('Hello world 3');
caretaker.setState(editor);

caretaker.undo(editor);

console.log(editor.getContent());  // 👉 Should log: 'Hello world 2'
