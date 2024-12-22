import { Component, DestroyRef, inject, input, OnInit, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { Option } from '../../../../shared/interfaces/option.interface';
import { FormData } from '../../interfaces/form.interface';
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
  reportTypeLabels = input.required<Option<ReportTypes>[]>();
  departmentLabels = input.required<Option<number>[]>();
  formDataChanged = output<FormData>();

  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  formGroup!: FormGroup;

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
