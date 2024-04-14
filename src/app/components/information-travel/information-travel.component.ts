import { Component, OnInit } from '@angular/core';
import { InfoService } from 'src/app/core/service/info.service';

@Component({
  selector: 'app-information-travel',
  templateUrl: './information-travel.component.html',
  styleUrls: ['./information-travel.component.css']
})
export class InformationTravelComponent implements OnInit {
  travelInfo: any;
  peticionesFrom: any;
  fechaSolicitud: string = ''; // Variable para almacenar la fecha de la solicitud

  constructor(private infoService: InfoService) { }

  ngOnInit(): void {
    this.travelInfo = this.infoService.getTravelInformation();
    this.fechaSolicitud = this.infoService.getFechaSolicitud(); // Obtener la fecha de solicitud
  }
}
