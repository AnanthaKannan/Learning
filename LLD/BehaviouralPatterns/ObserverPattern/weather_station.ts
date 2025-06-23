
/* weather station going to sent the data, other devices going to receives the date and display the same */
interface Observer {
  update(temperature: number): void
}

interface Subject {
  subscribe(observer: Observer): void;
  unsubscribe(observer: Observer): void;
  notify(data: any): void;
}

class Mobile implements Observer {
  public name: string;
  public temperature: number = 0;

  constructor(name: string) {
    this.name = name;
  }

  update(temp: number) {
    this.temperature = temp;
    console.log(`Device ${this.name} - Temperateure ${this.temperature}`)
  }
}

class DeisplayDeive implements Observer {
  update(temp: number) {
    console.log(`Temperateure ${temp}`)
  }
}

class WeatherState implements Subject {

  private devices: Observer[] = [];

  subscribe(device: Observer): void {
    this.devices.push(device)
  }

  unsubscribe(device: Observer): void {
    this.devices = this.devices.filter(obs => obs !== device);
  }

  notify(temp: number) {
    this.devices.forEach((device) => device.update(temp))
  }
}

const ws = new WeatherState()

ws.subscribe(new Mobile('Mobile-a'))
ws.subscribe(new Mobile('Mobile-b'))
ws.subscribe(new DeisplayDeive())

ws.notify(22)

ws.notify(47)

ws.notify(41)