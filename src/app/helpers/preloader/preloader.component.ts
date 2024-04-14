import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PreloaderService } from 'src/app/core/service/register.service';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.css']
})
export class PreloaderComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2600);
  }
}
