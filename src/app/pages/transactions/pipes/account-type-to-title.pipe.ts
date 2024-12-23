import { Pipe, PipeTransform } from '@angular/core';
import { AccountTypes } from '../enums/account.enum';

@Pipe({
  name: 'accountTypeToTitle',
  standalone: true
})
export class AccountTypeToTitlePipe implements PipeTransform {

  transform(accountType: AccountTypes, ...args: unknown[]): unknown {
    switch (accountType) {
      case AccountTypes.BANK:
        return 'Банковский';
      case AccountTypes.CASH:
        return 'Наличные';
      default:
        return 'Без группы';
    }
  }

}
