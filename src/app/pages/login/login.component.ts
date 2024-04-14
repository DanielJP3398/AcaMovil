import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  showForgotPasswordLink: boolean = false; // Variable para mostrar el enlace "Olvidé mi contraseña"

  constructor(private router: Router, private toastr: ToastrService) {}

  login() {
    if (this.username === 'josedaniel98' && this.password === '1998') {
      this.toastr.success('Ingresando', '', {
        timeOut: 1050,
        closeButton: true,
        progressBar: true,
        positionClass: 'toast-top-right'
      });

      // Retrasar la redirección después de mostrar el toast de éxito
      setTimeout(() => {
        this.router.navigate(['/layout']);
      }, 1050);
    } else {
      this.showForgotPasswordLink = true; // Mostrar el enlace solo cuando la contraseña es incorrecta
      this.toastr.error('Usuario o contraseña incorrectos', 'Error', {
        timeOut: 1500,
        closeButton: true,
        progressBar: true,
        positionClass: 'toast-top-right'
      });
    }
  }
}
