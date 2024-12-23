import { Component, inject, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { InputText } from "primeng/inputtext";
import { Select } from "primeng/select";
import { Password } from 'primeng/password';
import { Button } from 'primeng/button';
import { Option } from '../../../../shared/interfaces/option.interface';
import { Roles } from '../../../../shared/enums/role.enums';
import { LabelsService } from '../../../../shared/services/labels.service';
import { FormAccessData } from '../../interfaces/form.interface';

@Component({
  selector: 'app-add-access-item',
  standalone: true,
  imports: [
    InputText,
    ReactiveFormsModule,
    Select,
    Button,
    Password
  ],
  templateUrl: './add-access-item.component.html',
  styleUrl: './add-access-item.component.scss'
})
export class AddAccessItemComponent {
  private fb = inject(FormBuilder);
  private labelsService = inject(LabelsService);

  addAccess = output<FormAccessData>();

  roleOptions = toSignal<Option<Roles>[], []>(this.labelsService.getRoles(), { initialValue: [] });

  formGroup: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    fullName: ['', Validators.required],
    role: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    this.addAccess.emit(this.formGroup.value);
  }
}
