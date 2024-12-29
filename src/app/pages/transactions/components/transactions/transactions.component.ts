import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { take } from 'rxjs';
import { FormTransactionsComponent } from '../form-transactions/form-transactions.component';
import { OptionName } from '../../../../shared/interfaces/option.interface';
import { BudgetTypes } from '../../../../shared/interfaces/budget-types.enum';
import { LabelsService } from '../../../../shared/services/labels.service';
import { AccountOption, BudgetItem, Transaction } from '../../interfaces/transaction.interface';
import { TransactionForm } from '../../interfaces/transaction-form.interface';
import { TransactionTypes } from '../../enums/transaction.enum';
import { HeaderComponent } from '../header/header.component';
import { TransactionService } from '../../services/transaction.service';
import { TableTransactionsComponent } from '../table-transactions/table-transactions.component';
import { getBudgetTypeOptions } from '../../../../shared/utils/budget-types.util';

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
export class TransactionsComponent implements OnInit {
  transactionService = inject(TransactionService);
  labelsService = inject(LabelsService);
  destroyRef = inject(DestroyRef);

  isFormOpened = false;
  type: TransactionTypes = TransactionTypes.EXPENSE;
  departmentId!: number;
  accountId!: number;

  departmentLabels = toSignal<OptionName<number>[], []>(this.labelsService.getDepartments(), { initialValue: [] });
  counterparties = toSignal<OptionName<number>[], []>(this.labelsService.getCounterparties(), { initialValue: [] });
  budgetTypes = signal<OptionName<BudgetTypes>[]>(getBudgetTypeOptions(this.type));
  accounts = signal<AccountOption[]>([]);
  transactions = signal<Transaction[]>([]);
  budgetItems = signal<BudgetItem[]>([]);

  ngOnInit() {
    this.loadAccounts();
    this.loadTransactions();
  }

  openTransactionForm(type: TransactionTypes): void {
    this.type = type;
    this.budgetTypes.set(getBudgetTypeOptions(type));
    this.isFormOpened = true;
  }

  closeTransactionForm(): void {
    this.isFormOpened = false;
  }

  createTransaction(transactionForm: TransactionForm): void {
    this.transactionService.create(transactionForm, this.departmentId, this.type)
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.isFormOpened = false;
        this.loadTransactions(this.departmentId, this.accountId);
      });
  }

  deleteTransaction(id: number): void {
    this.transactionService.delete(id)
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.loadTransactions(this.departmentId, this.accountId));
  }

  departmentChanged(departmentId: number): void {
    this.departmentId = departmentId;
    this.loadAccounts(departmentId);
    this.loadTransactions(departmentId);
  }

  accountChanged(accountId: number): void {
    this.accountId = accountId;
    this.loadTransactions(this.departmentId, accountId);
  }

  budgetTypeChanged(budgetType: BudgetTypes): void {
    this.labelsService.getBudgetItems(budgetType, this.type).pipe(
      take(1),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(budgetItems => this.budgetItems.set(budgetItems));
  }

  private loadAccounts(departmentId?: number): void {
    this.labelsService.getAccounts(departmentId)
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe(accounts => this.accounts.set(accounts));
  }

  private loadTransactions(departmentId?: number, accountId?: number): void {
    this.transactionService.get(departmentId, accountId)
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe((transactions: Array<Transaction>) => this.transactions.set(transactions));
  }

}
