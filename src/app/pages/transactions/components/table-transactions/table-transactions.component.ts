import { Component, input, output } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { TransactionTypes } from '../../enums/transaction.enum';
import { Transaction } from '../../interfaces/transaction.interface';
import { BudgetTypeToTitlePipe } from '../../pipes/budget-type-to-title.pipe';
import { AccountTypeToTitlePipe } from '../../pipes/account-type-to-title.pipe';

@Component({
  selector: 'app-table-transactions',
  standalone: true,
  imports: [
    TableModule,
    Button,
    DatePipe,
    CurrencyPipe,
    Card,
    BudgetTypeToTitlePipe,
    AccountTypeToTitlePipe
  ],
  templateUrl: './table-transactions.component.html',
  styleUrl: './table-transactions.component.scss'
})
export class TableTransactionsComponent {
  transactions = input.required<Array<Transaction>>();
  delete = output<number>();
  protected readonly TransactionTypes = TransactionTypes;
}
