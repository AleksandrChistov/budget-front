import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { of, switchMap } from 'rxjs';
import { FormTransactionsComponent } from '../form-transactions/form-transactions.component';
import { Option } from '../../../../shared/interfaces/option.interface';
import { AccountOption, BudgetItem, Transaction } from '../../interfaces/transaction.interface';
import { TransactionForm } from '../../interfaces/transaction-form.interface';
import { BudgetTypes } from '../../enums/budget.enum';
import { TransactionTypes } from '../../enums/transaction.enum';
import { HeaderComponent } from '../header/header.component';
import { TransactionService } from '../../services/transaction.service';
import { TableTransactionsComponent } from '../table-transactions/table-transactions.component';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    FormTransactionsComponent,
    HeaderComponent,
    TableTransactionsComponent
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent {
  transactionService = inject(TransactionService);
  destroyRef = inject(DestroyRef);

  isFormOpened = false;
  type: TransactionTypes | null = null;
  departmentId: number | null = null;
  accountId: number | null = null;

  transactions = toSignal<Array<Transaction>, []>(this.transactionService.get(), { initialValue: [] });
  departments: Array<Option<number>> = [
    { label: 'Сибирский филиал', value: 1 },
    { label: 'Московский филиал', value: 2 }
  ]; // TODO replace with DB values
  accounts: Array<AccountOption> = [
    {
      title: 'Банковский',
      icon: 'id-card',
      children: [
        { label: 'ООО ВТБ р.счет', value: 1 },
        { label: 'АО ТБанк р.счет', value: 2 }
      ]
    },
    {
      title: 'Наличные',
      icon: 'money-bill',
      children: [
        { label: 'Касса Московсого филлиала', value: 3 },
        { label: 'Касса Сибирского филлиала', value: 4 }
      ]
    },
  ]; // TODO: it depends on department was chosen on the page or get all initially
  budgetTypes: Array<Option<BudgetTypes>> = [
    { label: 'Доходы', value: BudgetTypes.REVENUE },
    { label: 'Расходы', value: BudgetTypes.EXPENSES },
    { label: 'Инвестиции', value: BudgetTypes.CAPEX },
    { label: 'Капитал', value: BudgetTypes.CAPITAL },
  ];
  budgetItems: Array<BudgetItem> = [];
  counterparties: Array<Option<number>> = [
    { label: 'ООО Яндекс', value: 1 },
    { label: 'ИП Иванов', value: 2 },
  ];

  budgetTypeChanged(budgetType: string): void {
    of(budgetType).pipe(
      switchMap(budgetType => {
        // TODO: replace mock data with a request for budgetItems by budgetType
        return of([
          {
            id: 1,
            label: 'Операционные расходы',
            children: [
              {
                id: 2,
                label: 'Расходы на закупку',
                children: [
                  {
                    id: 3,
                    label: 'Закупка мебели в офис'
                  }
                ]
              },
              {
                id: 4,
                label: 'Амортизация'
              }
            ]
          },
          {
            id: 5,
            label: 'Зарплата сотрудникам',
            children: [
              {
                id: 6,
                label: 'Зарплата сотрудникам отдела ИТ'
              }
            ]
          },
        ])
      }),
      takeUntilDestroyed(this.destroyRef)
    )
      .subscribe((budgetItems: Array<BudgetItem>) => this.budgetItems = budgetItems);
  }

  createTransaction(transactionForm: TransactionForm): void {
    // TODO: make a request to create a new transaction
    console.log('type > ', this.type);
    console.log('departmentId > ', this.departmentId);
    console.log('accountId > ', this.accountId);
    console.log('transactionForm > ', transactionForm);
    console.log('budgetItem.id > ', transactionForm.budgetItem.id);
    console.log('paymentDate.toISOString > ', transactionForm.paymentDate.toISOString());
  }

  closeTransactionForm(): void {
    this.isFormOpened = false;
  }

  departmentChanged(departmentId: number): void {
    console.log('departmentId > ', departmentId);
    this.departmentId = departmentId;
    // TODO: make a request to get accounts options
    // TODO: make a request to get transactions
  }

  accountChanged(accountId: number): void {
    console.log('accountId > ', accountId);
    this.accountId = accountId;
    // TODO: make a request to get transactions
  }

  openTransactionForm(type: TransactionTypes): void {
    console.log('type > ', type);
    this.type = type;
    this.isFormOpened = true;
  }

  deleteTransaction(id: number): void {
    console.log('deleteTransaction', id);
    // TODO: make a request to delete the transaction
  }
}
