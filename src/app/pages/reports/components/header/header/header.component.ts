import { Component, DestroyRef, inject, input, OnInit, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { FormData, Option } from './header.interface';
import { reportTypesOptions } from './header.data';

@Component({
  selector: 'app-reports-header',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    Select,
    DatePicker,
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  reportType = input.required<string>();
  formDataChanged = output<FormData>();

  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  formGroup!: FormGroup;
  reportTypes: Array<Option> = reportTypesOptions;
  departments: Array<Option> = [
    { label: 'Сибирский филиал', value: 'Сибирский филиал' },
    { label: 'Московский филиал', value: 'Московский филиал' }
  ]; // TODO replace with DB values

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      reportType: [this.reportType(), Validators.required],
      department: [null],
      period: [null],
    })

    this.formGroup.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((formValue: FormData) => this.formDataChanged.emit(formValue));
  }

  get showFormValue(): string {
    return JSON.stringify(this.formGroup.value);
  }

}
