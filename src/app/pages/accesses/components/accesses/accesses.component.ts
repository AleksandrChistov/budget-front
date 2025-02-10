import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { switchMap, take } from 'rxjs';
import { AddAccessItemComponent } from '../add-access-item/add-access-item.component';
import { AccessItemComponent } from '../access-item/access-item.component';
import { AccessesService } from '../../services/accesses.service';
import { AccessData, FormAccessData } from '../../interfaces/form.interface';
import { Skeleton } from "primeng/skeleton";
import { LoadingService } from '../../../../shared/services/loading.service';

@Component({
  selector: 'app-accesses',
  standalone: true,
    imports: [
        AddAccessItemComponent,
        AccessItemComponent,
        Skeleton,
    ],
  templateUrl: './accesses.component.html',
  styleUrl: './accesses.component.scss'
})
export class AccessesComponent implements OnInit {
  private readonly accessesService = inject(AccessesService);
  private destroyRef = inject(DestroyRef);
  protected loadingService = inject(LoadingService);

  accesses = signal<AccessData[]>([]);

  ngOnInit() {
    this.accessesService.get()
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe(accesses => this.accesses.set(accesses));
  }

  addAccess(form: FormAccessData): void {
    this.accessesService.create(form)
      .pipe(
        take(1),
        takeUntilDestroyed(this.destroyRef),
        switchMap(() => this.accessesService.get()),
      )
      .subscribe(accesses => this.accesses.set(accesses));
  }

  deleteAccess(id: number) {
    this.accessesService.delete(id)
      .pipe(
        take(1),
        takeUntilDestroyed(this.destroyRef),
        switchMap(() => this.accessesService.get()),
      )
      .subscribe(accesses => this.accesses.set(accesses));
  }
}
