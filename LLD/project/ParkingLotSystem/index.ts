//------------------------ VEHICLE -----------------------------------//
abstract class Vehicle {
  constructor(public licensePlate: string) { }
}

class Car extends Vehicle { }
class Bike extends Vehicle { }


// ----------------------- PARKING SPOT ------------------------------//

class ParkingSpot {
  constructor(public spotNumber: number, public isOccupied: boolean = false) { }
}

// ----------------------- TICKET ---------------------------------- //

class Ticket {
  constructor(public ticketId: string, public licensePlate: string, public spotNumber: number, public entryDate: Date) { }
}

// ------------------------ PARKING-LOT ---------------------------- //
class ParkingLot {
  private spots: ParkingSpot[]
  private tickets: Map<string, Ticket> = new Map()

  constructor(public totalSpots: number) {
    this.spots = Array.from({ length: totalSpots }, (_: any, i: number) => new ParkingSpot(i))
  }

  parkVehicle(vehicle: Vehicle): Ticket | null {
    const spot = this.spots.find(s => !s.isOccupied);
    if (!spot) return null

    spot.isOccupied = true
    const ticket = new Ticket(
      `${Date.now()}-${vehicle.licensePlate}`,
      vehicle.licensePlate,
      spot.spotNumber,
      new Date())

    this.tickets.set(ticket.ticketId, ticket)
    return ticket;
  }

  leaveParking(ticketId: string): boolean {
    const ticket = this.tickets.get(ticketId)
    if (!ticket) return false
    const spot = this.spots.find((s) => s.spotNumber === ticket.spotNumber)
    spot!.isOccupied = false
    return true
  }

}

const pl = new ParkingLot(10)
const car = new Car('TN74AC4408')
const bike = new Bike('TN991212')

const carTicket = pl.parkVehicle(car)
const bikeTicket = pl.parkVehicle(bike)

console.log(carTicket)
console.log(bikeTicket)

if (carTicket && pl.leaveParking(carTicket.ticketId)) {
  console.log('car is leaving', carTicket.licensePlate)
}

const car2Ticket = pl.parkVehicle(new Car('XXXXX'))
console.log(car2Ticket)