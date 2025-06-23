class Device {
  public name: string;
  public temperature: number = 0;

  constructor(name: string) {
    this.name = name;
  }

  dispalyTemp(temp: number) {
    this.temperature = temp;
    console.log(`Device ${this.name} - Temperateure ${this.temperature}`)
  }
}

class Notify {

  private devices: Device[] = [];

  subscibe(device: Device): void {
    this.devices.push(device)
  }

  publish(temp: number) {
    this.devices.forEach((device) => device.dispalyTemp(temp))
  }
}

const notify = new Notify()

notify.subscibe(new Device('Device-a'))
notify.subscibe(new Device('Device-b'))
notify.subscibe(new Device('Device-c'))

notify.publish(22)

notify.publish(47)

notify.publish(41)