import { Component, DestroyRef, inject, input, OnInit, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { Option } from '../../../../shared/interfaces/option.interface';
import { FormData } from '../../interfaces/form.interface';
import { reportTypesOptions } from './header.data';
import { ReportTypes } from '../../enums/reports.enum';

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
  reportTypes: Array<Option<ReportTypes>> = reportTypesOptions;
  departments: Array<Option<number>> = [
    { label: 'Сибирский филиал', id: 1 },
    { label: 'Московский филиал', id: 2 }
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

}
