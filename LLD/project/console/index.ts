interface ILogger {
  log(message: string): void;
  error(message: string): void;
}

class Console {

  log(message: string): void {
    console.log(`INFO : ${message}`)
  }

  error(message: string): void {
    console.log(`ERROR : ${message}`)
  }
}

const cl = new Console()
cl.log('hello')