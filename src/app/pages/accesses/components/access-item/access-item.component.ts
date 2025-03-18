import { Component, inject, input, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { Roles } from '../../../../shared/enums/role.enums';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-access-item',
  standalone: true,
  imports: [
    Button,
    InputText,
    ReactiveFormsModule,
    Password,
    FormsModule,
  ],
  templateUrl: './access-item.component.html',
  styleUrl: './access-item.component.scss'
})
export class AccessItemComponent {
  public authService = inject(AuthService);

  email = input.required<string>();
  fullName = input.required<string>();
  role = input.required<string, Roles>({ transform: this.transformRole });
  password = input.required<string>();
  deleteAccess = output<void>()

  delete(): void {
    this.deleteAccess.emit();
  }

  private transformRole(role: Roles): string {
    switch (role) {
      case Roles.ADMIN:
        return 'Админ';
      case Roles.MANAGER:
        return 'Менеджер';
      case Roles.ANALYST:
        return 'Аналитик';
      default:
        return 'Неизвестный пользователей';
    }
  }
}
