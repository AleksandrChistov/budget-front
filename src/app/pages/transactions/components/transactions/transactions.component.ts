import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { take } from 'rxjs';
import { FormTransactionsComponent } from '../form-transactions/form-transactions.component';
import { Option } from '../../../../shared/interfaces/option.interface';
import { AccountOption, BudgetItem, Transaction } from '../../interfaces/transaction.interface';
import { TransactionForm } from '../../interfaces/transaction-form.interface';
import { BudgetTypes } from '../../../budgets/enums/budget.enum';
import { TransactionTypes } from '../../enums/transaction.enum';
import { HeaderComponent } from '../header/header.component';
import { TransactionService } from '../../services/transaction.service';
import { TableTransactionsComponent } from '../table-transactions/table-transactions.component';
import { LabelsService } from '../../../../shared/services/labels.service';

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
  type: TransactionTypes | null = null;
  departmentId!: number;
  accountId!: number;

  departmentLabels = toSignal<Option<number>[], []>(this.labelsService.getDepartments(), { initialValue: [] });
  budgetTypes = toSignal<Option<BudgetTypes>[], []>(this.labelsService.getBudgetTypes(), { initialValue: [] });
  counterparties = toSignal<Option<number>[], []>(this.labelsService.getCounterparties(), { initialValue: [] });
  accounts = signal<Array<AccountOption>>([]);
  transactions = signal<Array<Transaction>>([]);
  budgetItems = signal<Array<BudgetItem>>([]);

  ngOnInit() {
    this.loadAccounts();
    this.loadTransactions();
  }

  openTransactionForm(type: TransactionTypes): void {
    console.log('type > ', type);
    this.type = type;
    this.isFormOpened = true;
  }

  closeTransactionForm(): void {
    this.isFormOpened = false;
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

  deleteTransaction(id: number): void {
    console.log('deleteTransaction', id);
    // TODO: make a request to delete the transaction
  }

  departmentChanged(departmentId: number): void {
    console.log('departmentId > ', departmentId);
    this.departmentId = departmentId;
    this.loadAccounts(departmentId);
    this.loadTransactions(departmentId);
  }

  accountChanged(accountId: number): void {
    console.log('accountId > ', accountId);
    this.accountId = accountId;
    this.loadTransactions(this.departmentId, accountId);
  }

  budgetTypeChanged(budgetType: BudgetTypes): void {
    this.labelsService.getBudgetItems(budgetType).pipe(
      take(1),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(budgetItems => this.budgetItems.set(budgetItems));
  }

  private loadAccounts(departmentId?: number): void {
    this.labelsService.getAccounts(departmentId).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(accounts => this.accounts.set(accounts));
  }

  private loadTransactions(departmentId?: number, accountId?: number): void {
    this.transactionService.get(departmentId, accountId).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((transactions: Array<Transaction>) => this.transactions.set(transactions));
  }

}
