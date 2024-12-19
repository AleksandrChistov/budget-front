import { Component, effect, inject, input, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { PrimeTemplate } from 'primeng/api';
import { Textarea } from 'primeng/textarea';
import { Button } from 'primeng/button';
import { TreeSelect } from 'primeng/treeselect';
import { Option } from '../../../../shared/interfaces/option.interface';
import { AccountOption, BudgetItem } from '../interfaces/transaction.interface';
import { TransactionForm } from '../interfaces/form.interface';
import { TransactionTypes } from '../enums/transaction.enum';

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
  type = input.required<TransactionTypes>();
  budgetTypes = input.required<Array<Option>>();
  budgetItems = input.required<Array<BudgetItem>>();
  accountOptions = input.required<Array<AccountOption>>();
  counterpartyOptions = input.required<Array<Option>>();
  budgetTypeChanged = output<string>();
  formSubmitted = output<TransactionForm>();
  close = output<void>();

  fb = inject(FormBuilder);

  formGroup: FormGroup = this.fb.group({
    sum: [null, Validators.required],
    budgetType: [null, Validators.required],
    budgetItem: [{ value: null, disabled: true}, Validators.required],
    paymentDate: [null, Validators.required],
    account: [null, Validators.required],
    counterparty: [null, Validators.required],
    description: [null, Validators.required],
  });

  protected readonly TransactionTypes = TransactionTypes;

  constructor() {
    effect(() => {
      if (this.budgetItems().length > 0) {
        this.formGroup.get('budgetItem')?.enable();
      }
    });
  }

  ngOnInit(): void {
    this.formGroup.get('budgetType')?.valueChanges
      .subscribe(budgetType => this.budgetTypeChanged.emit(budgetType));
  }

  onSubmit(): void {
    this.formSubmitted.emit(this.formGroup.value);
  }

}
