import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayTime',
})
export class DisplayTimePipe implements PipeTransform {
  private months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  transform(value: string): string {
    const fulldate = value.split('T')[0];
    const day = fulldate.split('-')[2];
    const month = fulldate.split('-')[1];
    const year = fulldate.split('-')[0];

    return `${day} de ${this.months[Number(month)]} del ${year}`;
  }
}
