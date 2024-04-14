import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  isMenuOpen: boolean = false;

  constructor(private toastr: ToastrService, private router: Router) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  cerrarSesion() {
    this.toastr.info('Cerrando Sección', '', {
      timeOut: 1050,
      closeButton: true,
      progressBar: true,
      positionClass: 'toast-top-right'
    });

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1050);
  }
}

