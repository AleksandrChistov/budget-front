import { Component, effect, inject, input, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { PrimeTemplate } from 'primeng/api';
import { Textarea } from 'primeng/textarea';
import { Button } from 'primeng/button';
import { TreeSelect } from 'primeng/treeselect';
import { OptionName } from '../../../../shared/interfaces/option.interface';
import { BudgetTypes } from '../../../../shared/interfaces/budget-types.enum';
import { AccountOption, BudgetItem } from '../../interfaces/transaction.interface';
import { TransactionForm } from '../../interfaces/transaction-form.interface';
import { TransactionTypes } from '../../../../shared/enums/transaction.enum';

@Component({
  selector: 'app-form-transactions',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputNumber,
    Select,
    DatePicker,
    PrimeTemplate,
    Textarea,
    Button,
    TreeSelect
  ],
  templateUrl: './form-transactions.component.html',
  styleUrl: './form-transactions.component.scss'
})
export class FormTransactionsComponent implements OnInit {
  type = input.required<TransactionTypes | null>();
  account = input.required<number | null>();
  budgetTypes = input.required<Array<OptionName<BudgetTypes>>>();
  budgetItems = input.required<Array<BudgetItem>>();
  accounts = input.required<Array<AccountOption>>();
  counterparties = input.required<Array<OptionName<number>>>();
  budgetTypeChanged = output<BudgetTypes>();
  formSubmitted = output<TransactionForm>();
  close = output<void>();

  fb = inject(FormBuilder);

  formGroup!: FormGroup;

  protected readonly TransactionTypes = TransactionTypes;

  constructor() {
    effect(() => {
      if (this.budgetItems().length > 0 && this.formGroup.get('budgetType')?.value) {
        this.formGroup.get('budgetItem')?.enable();
      } else {
        this.formGroup.get('budgetItem')?.disable();
      }
    });
  }

  ngOnInit(): void {
    this.formGroup  = this.fb.group({
      sum: [null, Validators.required],
      budgetType: [null, Validators.required],
      budgetItem: [{ value: null, disabled: true}, Validators.required],
      paymentDate: [null, Validators.required],
      account: [this.account(), Validators.required],
      counterparty: [null, Validators.required],
      description: [null, Validators.required],
    });

    this.formGroup.get('budgetType')?.valueChanges
      .subscribe(budgetType => {
        this.formGroup.get('budgetItem')?.reset();
        this.formGroup.get('budgetItem')?.disable();
        this.budgetTypeChanged.emit(budgetType);
      });
  }

  onSubmit(): void {
    this.formSubmitted.emit(this.formGroup.value);
  }

}
