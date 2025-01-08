import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { take } from 'rxjs';
import { FileSelectEvent } from 'primeng/fileupload';
import { BudgetService } from '../services/budget.service';
import { LabelsService } from '../../../shared/services/labels.service';
import { OptionName } from '../../../shared/interfaces/option.interface';
import { Budget } from '../interfaces/budget.interface';
import { BudgetTypes } from '../../../shared/interfaces/budget-types.enum';

@Component({
  standalone: true,
  template: ''
})
export class BudgetCommonComponent implements OnInit {
  budgetService = inject(BudgetService);
  labelsService = inject(LabelsService);
  destroyRef = inject(DestroyRef);

  departmentLabels = toSignal<OptionName<number>[], []>(this.labelsService.getDepartments(), { initialValue: [] });
  budgetLabels = signal<OptionName<number>[]>([]);
  budget = signal<Budget>({} as Budget);
  departmentId!: number;
  budgetId?: number;
  budgetType!: BudgetTypes;

  protected readonly BudgetTypes = BudgetTypes;

  ngOnInit(): void {
    this.getBudgetLabels();
  }

  budgetChanged(id?: number): void {
    console.log('budgetChanged ', id);
    if (id) {
      this.budgetService.get(this.budgetType, id).pipe(
        take(1),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe((budget: Budget) => this.budget.set(budget));
    }
  }

  departmentChanged(id: number): void {
    console.log('departmentChanged ', id);
    this.departmentId = id;
    this.budgetId = undefined;
    this.getBudgetLabels(id);
  }

  saveBudget(budget: Budget): void {
    console.log('saveBudget', budget);
    this.budget().departmentId = this.departmentId ?? this.budget().departmentId;
    this.budgetId = this.budget().id;
    this.budgetService.update(this.budget()).pipe(
      take(1),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => this.budgetChanged(this.budgetId));
  }

  createNewBudget(departmentId: number): void {
    console.log('createNewBudget', departmentId);
    this.budgetService.createNew(departmentId).pipe(
      take(1),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.budgetId = undefined;
      this.getBudgetLabels(departmentId);
    });
  }

  deleteBudget(id: number): void {
    console.log('deleteBudget', id);
    this.budget().departmentId = this.departmentId ?? this.budget().departmentId;
    this.budgetService.delete(id).pipe(
      take(1),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.budgetId = undefined;
      this.getBudgetLabels(this.budget().departmentId);
    });
  }

  saveToExcel(): void {
    console.log('getFromExcel', this.budgetId ?? this.budget().id, this.budgetType);
    this.budgetService.downLoadExcel(this.budgetId ?? this.budget().id, this.budgetType).pipe(
      take(1),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((filePath) => window.open(filePath));
  }

  getFromExcel(event: FileSelectEvent): void {
    console.log('getFromExcel', event);
    this.budgetService.saveFromExcel(event.files[0], this.budgetId ?? this.budget().id).pipe(
      take(1),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.budgetId = undefined;
      this.getBudgetLabels(this.budget().departmentId);
    });
  }

  private getBudgetLabels(departmentId?: number): void {
    console.log('departmentId ', departmentId);
    this.labelsService.getBudgetNames(departmentId)
      .pipe(
        take(1),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe(budgetLabels => this.budgetLabels.set(budgetLabels));
  }

}
