import { Component } from '@angular/core';
import { AddAccessItemComponent } from '../add-access-item/add-access-item.component';
import { AccessItemComponent } from '../access-item/access-item.component';
import { FormAccessData } from '../../interfaces/form.interface';
import { Roles } from '../../../../shared/enums/role.enums';

@Component({
  selector: 'app-accesses',
  standalone: true,
  imports: [
    AddAccessItemComponent,
    AccessItemComponent,
  ],
  templateUrl: './accesses.component.html',
  styleUrl: './accesses.component.scss'
})
export class AccessesComponent {
  accesses: Array<FormAccessData & { id: number }> = [
    {
      id: 1,
      email: 'test@yandex.ru',
      fullName: 'Иванов Иван Иванович',
      role: Roles.ADMIN,
      password: '123456'
    },
    {
      id: 2,
      email: 'test2@yandex.ru',
      fullName: 'Петров Петр Петрович',
      role: Roles.MANAGER,
      password: 'ffgfdh123456'
    }
  ];
  addAccess(form: FormAccessData): void {
    console.log('addAccess > ', form); // TODO make a POST request
  }
  deleteAccess(id: number) {
    console.log('deleteAccess > ', id); // TODO make a DELETE request
  }
}
