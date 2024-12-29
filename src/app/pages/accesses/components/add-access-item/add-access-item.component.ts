import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { InputText } from "primeng/inputtext";
import { Select } from "primeng/select";
import { Password } from 'primeng/password';
import { Button } from 'primeng/button';
import { FormAccessData } from '../../interfaces/form.interface';
import { roles } from '../../consts/roles.consts';

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

  addAccess = output<FormAccessData>();

  roleOptions = roles;

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
