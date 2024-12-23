import { Component, input, output } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { TransactionTypes } from '../../enums/transaction.enum';
import { AccountTypes } from '../../enums/account.enum';
import { BudgetTypes } from '../../../budgets/enums/budget.enum';
import { Transaction } from '../../interfaces/transaction.interface';
import { Card } from 'primeng/card';
import { BudgetTypeToTitlePipe } from '../../pipes/budget-type-to-title.pipe';

@Component({
  selector: 'app-table-transactions',
  standalone: true,
  imports: [
    TableModule,
    Button,
    DatePipe,
    CurrencyPipe,
    Card,
    BudgetTypeToTitlePipe
  ],
  templateUrl: './table-transactions.component.html',
  styleUrl: './table-transactions.component.scss'
})
export class TableTransactionsComponent {
  transactions = input.required<Array<Transaction>>();
  delete = output<number>();
  protected readonly TransactionTypes = TransactionTypes;
  protected readonly AccountTypes = AccountTypes;
  protected readonly BudgetTypes = BudgetTypes;
}
