import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { of, switchMap } from 'rxjs';
import { FormTransactionsComponent } from '../form-transactions/form-transactions.component';
import { Option } from '../../../../shared/interfaces/option.interface';
import { AccountOption, BudgetItem } from '../interfaces/transaction.interface';
import { TransactionForm } from '../interfaces/form.interface';
import { BudgetTypes } from '../enums/budget.enum';
import { TransactionTypes } from '../enums/transaction.enum';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    FormTransactionsComponent
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent {
  destroyRef = inject(DestroyRef);

  isFormOpened = true; // TODO: initial value should be false
  type: TransactionTypes = TransactionTypes.INCOME;
  budgetTypes: Array<Option> = [
    { label: 'Доходы', value: BudgetTypes.REVENUE },
    { label: 'Расходы', value: BudgetTypes.EXPENSES },
    { label: 'Инвестиции', value: BudgetTypes.CAPEX },
    { label: 'Капитал', value: BudgetTypes.CAPITAL },
  ];
  budgetItems: Array<BudgetItem> = [];
  accountOptions: Array<AccountOption> = [
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
  ]; // TODO: it depends on department was chosen on the page
  counterpartyOptions: Array<Option> = [
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

  formSubmitted(transactionForm: TransactionForm): void {
    // TODO: replace with http request
    console.log('transactionForm > ', transactionForm);
    console.log('budgetItem.id > ', transactionForm.budgetItem.id);
    console.log('paymentDate.toISOString > ', transactionForm.paymentDate.toISOString());
  }

  closeForm(): void {
    this.isFormOpened = false;
  }
}
