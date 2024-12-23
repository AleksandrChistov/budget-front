import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AddAccessItemComponent } from '../add-access-item/add-access-item.component';
import { AccessItemComponent } from '../access-item/access-item.component';
import { AccessesService } from '../../services/accesses.service';
import { AccessData, FormAccessData } from '../../interfaces/form.interface';

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
  private readonly accessesService = inject(AccessesService);

  accesses = toSignal<AccessData[], []>(this.accessesService.get(), { initialValue: [] });

  addAccess(form: FormAccessData): void {
    console.log('addAccess > ', form); // TODO make a POST request
  }
  deleteAccess(id: number) {
    console.log('deleteAccess > ', id); // TODO make a DELETE request
  }
}
