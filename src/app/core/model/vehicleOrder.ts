export class VehicleOrder {
  id?: number;
  origin?: string;
  latOrigin?: number;
  longOrigin?: number;
  destination?: string;
  latDestination?: number;
  longDestination?: number;
  distance?: number;
  value?: number;
  createdAt?: Date;
  status?: string;
  vehicleTypeName?: string;
  driverUserContactNumber?: number;
descripcion: any;

  constructor(
    origin: string,
    latOrigin: number,
    longOrigin: number,
    destination: string,
    latDestination: number,
    longDestination: number,
    distance: number,
    value: number,
    createdAt: Date,
    status: string,
    vehicleTypeName: string,
    id?: number,
    driverUserContactNumber?: number,
  ) {
    this.id = id;
    this.origin = origin;
    this.latOrigin = latOrigin;
    this.longOrigin = longOrigin;
    this.destination = destination;
    this.latDestination = latDestination;
    this.longDestination = longDestination;
    this.distance = distance;
    this.value = value;
    this.createdAt = createdAt;
    this.status = status;
    this.vehicleTypeName = vehicleTypeName;
    this.driverUserContactNumber = driverUserContactNumber;
  }
}
