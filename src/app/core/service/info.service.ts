import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  private travelInformation: any;

  constructor() { }

  setTravelInformation(travelInfo: any) {
    this.travelInformation = travelInfo;
  }

  getTravelInformation() {
    return this.travelInformation;
  }

  getFechaSolicitud() {
    // Aquí obtienes la fecha de la solicitud desde el objeto de información de viaje
    return this.travelInformation?.fecha;
  }
}
