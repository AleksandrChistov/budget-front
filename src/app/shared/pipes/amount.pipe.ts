import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amount',
  standalone: true
})
export class AmountPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    const amount = value.toString();
    if (amount.length < 7) {
      return this.formatNumberWithSpaces(value);
    }
    const num = parseFloat(amount);
    const formattedNum = (num / 1000).toFixed(1);
    const parts = formattedNum.split('.');
    const integerPart = this.formatNumberWithSpaces(parseInt(parts[0]));
    return integerPart + (parts[1] ? ',' + parts[1] : '') + " К";
  }

  private formatNumberWithSpaces(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

}
