import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private count = signal<number>(0);
  public isLoading = computed(() => {
    return this.count() != 0;
  });

  load(): void {
    this.count.set(this.count() + 1);
  }

  stop(): void {
    this.count.set(this.count() - 1);
  }
}
