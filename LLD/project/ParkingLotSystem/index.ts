
//------------------------ VEHICLE -----------------------------------//

enum Type {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
}

abstract class Vehicle {
  constructor(public licensePlate: string) { }
  abstract getType(): Type;
}

class Car extends Vehicle {
  getType(): Type {
    return Type.MEDIUM;
  }
}
class Bike extends Vehicle {
  getType(): Type {
    return Type.SMALL;
  }
}

// ----------------------- PARKING SPOT ------------------------------//

class ParkingSpot {
  constructor(
    public spotNumber: number,
    public isOccupied: boolean = false,
  ) { }
}

// ----------------------- TICKET ---------------------------------- //

class Ticket {
  constructor(
    public ticketId: string,
    public licensePlate: string,
    public spotNumber: number,
    public parkType: Type,
    public entryDate: Date,
  ) { }
}

enum PaymentType {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
  UPI = 'UPI'
}

class Bill {
  constructor(public paid: number, public paymentType: PaymentType) { }
}

class Payment {
  private charges: Record<Type, number>;
  constructor() {
    this.charges = { [Type.SMALL]: 100, [Type.MEDIUM]: 150, [Type.LARGE]: 200 };
  }

  generate(type: Type, entryDate: Date): number {
    const hours = Math.ceil(
      Math.abs(new Date().getTime() - entryDate.getTime()) / (1000 * 60 * 60),
    );
    return hours * this.charges[type];
  }

  pay(amount: number, paymentType: PaymentType): Bill {
    console.log(`User Paid ${amount} by ${paymentType}`)
    return new Bill(amount, paymentType)
  }
}

// ------------------------ PARKING-LOT ---------------------------- //
class ParkingLot {
  private spots: ParkingSpot[];
  private tickets: Map<string, Ticket> = new Map();
  private payment: Payment = new Payment()

  constructor(public totalSpots: number) {
    this.spots = Array.from(
      { length: totalSpots },
      (_: any, i: number) => new ParkingSpot(i + 1),
    );
  }

  parkVehicle(vehicle: Vehicle): Ticket | null {
    const spot = this.spots.find((s) => !s.isOccupied);
    if (!spot) return null;

    spot.isOccupied = true;
    const ticket = new Ticket(
      `${Date.now()}-${vehicle.licensePlate}`,
      vehicle.licensePlate,
      spot.spotNumber,
      vehicle.getType(),
      new Date(),
    );

    this.tickets.set(ticket.ticketId, ticket);
    return ticket;
  }

  leaveParking(ticketId: string): number {
    const ticket = this.tickets.get(ticketId);
    if (!ticket) return 0;
    const spot = this.spots.find((s) => s.spotNumber === ticket.spotNumber);
    spot!.isOccupied = false;
    return this.payment.generate(ticket.parkType, ticket.entryDate);
  }

  pay(amount: number, paymentType: PaymentType) {
    this.payment.pay(amount, paymentType)
  }
}

const pl = new ParkingLot(10);
const car = new Car("TN74AC4408");
const bike = new Bike("TN991212");

const carTicket = pl.parkVehicle(car);
const bikeTicket = pl.parkVehicle(bike);

console.log(carTicket);
console.log(bikeTicket);

if (carTicket) {
  const billAmount = pl.leaveParking(carTicket.ticketId);
  pl.pay(billAmount, PaymentType.UPI)

  console.log("car is leaving", carTicket.licensePlate, 'needs to pay', billAmount);
}

const car2Ticket = pl.parkVehicle(new Car("XXXXX"));
console.log(car2Ticket);
