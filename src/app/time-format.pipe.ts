import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

   
    try {
     
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        
        const timePart = value.split('T')[1]?.split('.')[0];
        return timePart || '';
      }

      
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');

      return `${hours}:${minutes}:${seconds}`;
    } catch (e) {
      console.error('Invalid date value:', value);
      return '';
    }
  }
}
