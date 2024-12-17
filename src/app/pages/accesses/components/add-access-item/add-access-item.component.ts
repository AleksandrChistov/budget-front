import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { InputText } from "primeng/inputtext";
import { Select } from "primeng/select";
import { Password } from 'primeng/password';
import { Button } from 'primeng/button';
import { Option } from '../../../reports/components/header/header/header.interface';
import { FormAccessData } from '../../interfaces/form.interface';
import { Roles } from '../../../../shared/enums/role.enums';

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
  addAccess = output<FormAccessData>();
  private fb = inject(FormBuilder);
  formGroup: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    fullName: ['', Validators.required],
    role: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  roleOptions: Option[] = [
    { name: 'Админ', value: Roles.ADMIN},
    {name: 'Менеджер', value: Roles.MANAGER},
    {name: 'Аналитик', value: Roles.ANALYST}
  ];
  onSubmit() {
    this.addAccess.emit(this.formGroup.value);
  }
}
