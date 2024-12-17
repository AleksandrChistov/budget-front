import { Component, input, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';

@Component({
  selector: 'app-access-item',
  standalone: true,
  imports: [
    Button,
    InputText,
    ReactiveFormsModule,
    Password,
    FormsModule
  ],
  templateUrl: './access-item.component.html',
  styleUrl: './access-item.component.scss'
})
export class AccessItemComponent {
  email = input.required<string>();
  fullName = input.required<string>();
  role = input.required<string>();
  password = input.required<string>();
  deleteAccess = output<void>()

  delete(): void {
    this.deleteAccess.emit();
  }
}
