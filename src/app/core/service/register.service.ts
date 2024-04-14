import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PreloaderService {
  constructor() { }

  simulateDelay(ms: number) {
    return timer(ms).pipe(
      tap(() => console.log('Simulating delay...'))
    );
  }
}
