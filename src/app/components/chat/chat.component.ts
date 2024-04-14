import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  mensaje: string = ''; // Propiedad para almacenar el mensaje

  mensajes: { sender: string; content: string }[] = []; // Array para almacenar historial de mensajes

  enviarMensaje() {
    if (this.mensaje.trim() !== '') {
      this.mensajes.push({ sender: 'Tu', content: this.mensaje });
      this.mensaje = ''; // Limpiar el input después de enviar el mensaje
    }
  }
}
