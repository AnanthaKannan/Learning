interface Button {
  render(): void
}
interface ScrollBar {
  scroll(): void
}

class MacButton implements Button {
  public render() {
    console.log('Render mac button')
  }
}

class MacScrollBar implements ScrollBar {
  public scroll() {
    console.log('Scroll mac scrollbar')
  }
}

class WindowButton implements Button {
  public render() {
    console.log('Render window button')
  }
}

class WindowScrollBar implements ScrollBar {
  public scroll() {
    console.log('Scroll window scrollbar')
  }
}

interface GuiFactory {
  createButton(): Button
  createScrollBar(): ScrollBar
}

class WindowFactory implements GuiFactory {
  public createButton(): WindowButton {
    return new WindowButton()
  }

  public createScrollBar(): WindowScrollBar {
    return new WindowScrollBar()
  }
}

class MacFactory implements GuiFactory {
  public createButton(): MacButton {
    return new MacButton()
  }

  public createScrollBar(): MacScrollBar {
    return new MacScrollBar()
  }
}

// client code

class Application {
  private button: Button;
  private scrollBar: ScrollBar

  constructor(factory: GuiFactory) {
    this.button = factory.createButton()
    this.scrollBar = factory.createScrollBar()
  }

  public renderUi(): void {
    this.button.render()
    this.scrollBar.scroll()
  }
}

const ui = new Application(new MacFactory())
ui.renderUi()
