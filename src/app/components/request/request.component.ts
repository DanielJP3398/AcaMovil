import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VehicleOrder } from 'src/app/core/model/vehicleOrder';
import { InfoService } from 'src/app/core/service/info.service';
import { ToastrService } from 'ngx-toastr';

declare const google: any;

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent {
  @ViewChild('origenInput', { static: false }) origenInput!: ElementRef;
  @ViewChild('destinoInput', { static: false }) destinoInput!: ElementRef;

  autocompleteOrigen: any;
  autocompleteDestino: any;

  status = "ACTIVE";
  infoIf: boolean = false;
  formIf: Boolean = true;
  map: any;
  duracion: any;
  distance: any;
  Tiempo: any;
  value: any;
  kmt = 20;
  minima = 0;
  vehicleOrder?: VehicleOrder;
  createdAt = new Date();
  vehicleTypeName: string = "";
  fecha: string = "";
  descripcion: string = ""
  currentImageIndex: number = 0;

  ubicacionDestino!: string;
  ubicacionOrigen!: string;
  coodenadasOrigen: any;
  coordenadasDestino: any;

  origin: any;
  latOrigin: any;
  longOrigin: any;
  destination: any;
  latDestination: any;
  longDestination: any;

  botonCalcularRuta: boolean = true;
  botonCancelarRuta: boolean = false;
  botonSolicitarViaje: boolean = false;

  peticionesFrom!: FormGroup;

  selectedValue: string | null = null;
  formGroup: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private InfoService: InfoService,
  ) { }

  ngOnDestroy(): void {
    // Aquí puedes realizar cualquier limpieza necesaria antes de destruir el componente
    console.log('Componente de solicitud de vehículos destruido');
  }

  ngOnInit(): void {
    this.initMap();
    this.peticionesFrom = this.formBuilder.group(
      {
        origen: ['', Validators.required],
        destino: ['', Validators.required],
        fecha: ['', Validators.required],
        descripcion: ['', Validators.required]
      }
    );

  }

  ngAfterViewInit(): void {
    const options = {
      fields: ["formatted_address", "geometry", "name"],
      strictBounds: false,
    };
    this.autocompleteOrigen = new google.maps.places.Autocomplete(this.origenInput.nativeElement, options);
    this.autocompleteDestino = new google.maps.places.Autocomplete(this.destinoInput.nativeElement, options);
  }

  private initMap() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.map = new google.maps.Map(document.getElementById('map'), {
            center: userLocation,
            zoom: 17,
            disableDefaultUI: true,
          });

          const marker = new google.maps.Marker({
            position: userLocation,
            map: this.map,
            title: 'Ubicación'
          });

          this.setBoundsToInputs();
        },
        (error) => {
          console.log('Error getting user location', error);
          this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 6.249756, lng: -75.575315 },
            zoom: 17,
            //mapTypeId: 'terrain',
            disableDefaultUI: true,
          });
          this.setBoundsToInputs();

        }
      );
    } else {
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 6.249756, lng: -75.575315 },
        zoom: 17,
        //mapTypeId: 'terrain',
        disableDefaultUI: true,
      });
      this.setBoundsToInputs();
    }
  }

  setBoundsToInputs(): void {
    this.autocompleteOrigen.bindTo("bounds", this.map);
    this.autocompleteDestino.bindTo("bounds", this.map);
  }

  buscarAutocompletadoOrigen(autocomplete: any) {
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      this.origin = this.origenInput.nativeElement.value;
      this.obtenerCoordenadas(this.origin).then((coordenadas) => {
        const latitud = coordenadas.latitud;
        const longitud = coordenadas.longitud;

        // Centrar el mapa en la ubicación del marcador
        this.map.setCenter({ lat: latitud, lng: longitud });

        // Crear un marcador en el mapa
        const marker = new google.maps.Marker({
          position: { lat: latitud, lng: longitud },
          map: this.map
        });
      }).catch((error) => {
        console.error(error);
      });
    });
  }

  buscarAutocompletadoDestino(autocomplete: any) {
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      this.destination = this.destinoInput.nativeElement.value;
      this.obtenerCoordenadas(this.destination).then((coordenadas) => {
        const latitud = coordenadas.latitud;
        const longitud = coordenadas.longitud;

        // Centrar el mapa en la ubicación del marcador
        this.map.setCenter({ lat: latitud, lng: longitud });

        // Crear un marcador en el mapa
        const marker = new google.maps.Marker({
          position: { lat: latitud, lng: longitud },
          map: this.map
        });
      }).catch((error) => {
        console.error(error);
      });
    });
  }

  usarUbicacionActual() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.origin = userLocation;// Asignar la ubicación actual a la variable origen
        this.origenInput.nativeElement.value = userLocation;
        const marker = new google.maps.Marker({
          position: userLocation,
          map: this.map,
          title: 'Ubicación usuario'
        });
      },
    )
  }

  async actualizarOrigen(): Promise<void> {
    this.origin = this.origenInput.nativeElement.value;
    this.obtenerCoordenadas(this.origin).then((coordenadas) => {
      this.latOrigin = coordenadas.latitud;
      this.longOrigin = coordenadas.longitud;
      this.map.setCenter({ lat: this.latOrigin, lng: this.longOrigin });
      const marker = new google.maps.Marker({
        position: { lat: this.latOrigin, lng: this.longOrigin },
        map: this.map
      });
    }).catch((error) => {
      console.error(error);
    });
  }

  async actualizarDestino(): Promise<void> {
    this.destination = this.destinoInput.nativeElement.value;
    this.obtenerCoordenadas(this.destination).then((coordenadas) => {
      this.latDestination = coordenadas.latitud;
      this.longDestination = coordenadas.longitud;
      this.map.setCenter({ lat: this.latDestination, lng: this.longDestination });
      const marker = new google.maps.Marker({
        position: { lat: this.latDestination, lng: this.longDestination },
        map: this.map
      });
    }).catch((error) => {
      console.error(error);
    });
  }

  private obtenerCoordenadas(ubicacion: string): Promise<{ latitud: number, longitud: number }> {
    const geocoder = new google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address: ubicacion }, (results: any[], status: any) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const latitud = results[0].geometry.location.lat();
          const longitud = results[0].geometry.location.lng();
          resolve({ latitud, longitud });
        } else {
          reject('Error al obtener las coordenadas de entrada');
        }
      });
    });
  }

  calcularRuta(): void {
    if (this.origin && this.destination) {
      const directionService = new google.maps.DirectionsService();
      const directionRender = new google.maps.DirectionsRenderer();

      directionRender.setMap(this.map);

      directionService.route({
        origin: this.origin,
        destination: this.destination,
        travelMode: google.maps.TravelMode.DRIVING
      },
        (response: any, status: any) => {
          if (status === 'OK') {
            directionRender.setDirections(response);
            const route = response.routes[0];
            this.Tiempo = route.legs[0].duration.text;
            this.distance = parseFloat(response.routes[0].legs[0].distance.text);
            // if (this.distance <= 3) {
            //   this.minima = 100;
            //   this.distance - 3;
            // }
            const kilometroValue = 14.5; // Valor fijo por kilómetro
            const totalKilometros = this.distance * kilometroValue;
            const vehicleTypeValue = Number(this.selectedValue);
            const totalValue = totalKilometros + vehicleTypeValue;
            this.value = totalValue;
            // this.fecha = this.formGroup.get('fecha').value;
            // this.descripcion = this.formGroup.get('descripcion').value;

            // Verificar si tanto el origen como el destino están llenos
            if (this.origin && this.destination) {
              this.botonCancelarRuta = true;
              this.botonSolicitarViaje = true;
              this.botonCalcularRuta = false;
            }

            this.vehicleOrder = new VehicleOrder(
              this.origin,
              this.latOrigin,
              this.longOrigin,
              this.destination,
              this.latDestination,
              this.longDestination,
              this.distance,
              this.value,
              this.createdAt,
              this.status,
              this.vehicleTypeName,

            );

            this.formIf = false;
            this.infoIf = true;

            console.log(`Distancia: ${route.legs[0].distance.text}`); // Mostrar la distancia en la consola

          } else {
            console.log('Error al calcular la ruta');
          }
        });
    } else {
      this.toastr.warning('Debe elegir un origen y un destino', '', {
        timeOut: 2000,
        closeButton: true,
        progressBar: true,
        positionClass: 'toast-top-right'
      });
    }
  }

  solicitarVehiculo() {
    var formValues = this.peticionesFrom.value
    if (formValues.origen != '' || formValues.destino != '') {
      //cuando consuma mi servicio
      //this.vehicleOrderService.vehicleOrder(this.vehicleOrder).subscribe(
      //response => {
      // if (this.vehicleOrderService.redirectUrl) {
      // this.router.navigate([this.vehicleOrderService.redirectUrl]);
      //  this.vehicleOrderService.redirectUrl = null;
      //} else {
      //   this.router.navigate(['']).then(r => r);
      // }
      // }
      //);
    } else {

    }
  }

  confirmarVehiculo() {
    var formValues = this.peticionesFrom.value;

    if (formValues.origen != '' || formValues.destino != '') {
      this.vehicleOrder = new VehicleOrder(

        this.origin,
        this.latOrigin,
        this.longOrigin,
        this.destination,
        this.latDestination,
        this.longDestination,
        this.distance,
        this.value,
        this.createdAt,
        this.status,
        this.vehicleTypeName,

      );
      this.fecha = formValues.fecha;

      this.InfoService.setTravelInformation(this.vehicleOrder);
      this.toastr.success('Servicio Solicitado', '', {
        timeOut: 2000,
        closeButton: true,
        progressBar: true,
        positionClass: 'toast-top-right'
      });
      this.peticionesFrom.reset();
      // Cambiar el estado para mostrar el formulario anterior y ocultar la información
      this.formIf = true;
      this.infoIf = false;

      // Habilitar el botón de calcular ruta y ocultar los botones de cancelar y confirmar
      this.botonCalcularRuta = true;
      this.botonCancelarRuta = false;
      this.botonSolicitarViaje = false;
      this.InfoService.setTravelInformation(this.vehicleOrder);
      // Redirecciono a la misma página para reiniciar el componente
      this.router.navigate(['/layout']).then(() => {
        console.log('Componente reiniciado');
      });
      // const optiones = {
      //   fields: ["formatted_address", "geometry", "name"],
      //   strictBounds: false,
      // };
      // this.peticionesFrom.get('origen')?.enable(); // Habilitar el input de origen
      // this.peticionesFrom.get('destino')?.enable(); // Habilitar el input de destino
      // this.autocompleteOrigen = new google.maps.places.Autocomplete(this.origenInput.nativeElement, optiones); // Volver a habilitar el autocompletado para el origen
      // this.autocompleteDestino = new google.maps.places.Autocomplete(this.destinoInput.nativeElement, optiones); // Volver a habilitar el autocompletado para el destino

    } else {

    }
  }

  cancelarRuta() {
    try {
      // Limpiar los valores de origen y destino
      this.peticionesFrom.get('origen')?.setValue('');
      this.peticionesFrom.get('destino')?.setValue('');

      // Cambiar el estado para mostrar el formulario inicial y ocultar la información
      this.formIf = true;
      this.infoIf = false;

      // Habilitar el botón de calcular ruta y ocultar los botones de cancelar y solicitar
      this.botonCalcularRuta = true;
      this.botonCancelarRuta = false;
      this.botonSolicitarViaje = false;

      this.peticionesFrom.reset();

      this.toastr.warning('Servicio Cancelaro', '', {
        timeOut: 1500,
        closeButton: true,
        progressBar: true,
        positionClass: 'toast-top-right'
      });
    } catch (error) {
      console.log('Error al cancelar ruta:', error);
    }
  }

  selectImage(image: any) {
    this.selectedValue = image.valor;
    console.log(this.selectedValue);

    switch (image.nombre) {
      case './assets/camion-de-carga.png':
        this.vehicleTypeName = "Camión carga 3x5mts";
        break;
      case './assets/camioneta-de-carga.png':
        this.vehicleTypeName = "Camioneta carga 2x2mts";
        break;

      default:
        this.vehicleTypeName = "no selecciono vehiculo";
    }
  }

  images: any[] = [
    { nombre: './assets/camion-de-carga.png', valor: 20 },
    { nombre: './assets/camioneta-de-carga.png', valor: 2 },
    { nombre: './assets/van-cargo.png', valor: 5 },
    { nombre: './assets/planchon-largo.png', valor: 30 },
    { nombre: './assets/camion-de-reparto.png', valor: 900 },
    { nombre: './assets/camion.png', valor: 50 },
    { nombre: './assets/camioneta.png', valor: 150 },
    { nombre: './assets/recoger-coche.png', valor: 20 }
  ];
}
