import { Component, DestroyRef, inject, input, OnInit, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { Button } from 'primeng/button';
import { PrimeTemplate } from 'primeng/api';
import { OptionName } from '../../../../shared/interfaces/option.interface';
import { AccountOption } from '../../interfaces/transaction.interface';
import { TransactionTypes } from '../../../../shared/enums/transaction.enum';

@Component({
  selector: 'app-transaction-header',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    Select,
    FormsModule,
    PrimeTemplate,
    Button
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  departments = input.required<OptionName<number>[]>();
  accounts = input.required<AccountOption[]>();
  departmentChanged = output<number>();
  accountChanged = output<number>();
  createTransaction = output<TransactionTypes>();

  protected readonly TransactionTypes = TransactionTypes;

  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  formGroup!: FormGroup;

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      department: [null],
      account: [null],
    });

    this.formGroup.get('department')?.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((department: number) => {
        this.formGroup.get('account')?.reset(null, {onlySelf: true, emitEvent: false});
        this.departmentChanged.emit(department);
      });

    this.formGroup.get('account')?.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((account: number) => this.accountChanged.emit(account));
  }

}
