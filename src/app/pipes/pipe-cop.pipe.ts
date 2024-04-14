import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeCop'
})
export class PipeCopPipe implements PipeTransform {

  transform(value: number): string {
    if (!value) {
      return '';
    }

    const formattedValue = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    }).format(value);

    return formattedValue;
  }
}

