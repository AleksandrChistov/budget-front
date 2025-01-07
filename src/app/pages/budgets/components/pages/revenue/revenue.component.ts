import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { TableBudgetsComponent } from '../../table-budgets/table-budgets.component';
import { BudgetCommonComponent } from '../../budget-common.component';
import { BudgetTypes } from '../../../../../shared/interfaces/budget-types.enum';

@Component({
  selector: 'app-revenue',
  standalone: true,
  imports: [
    HeaderComponent,
    TableBudgetsComponent
  ],
  templateUrl: './revenue.component.html',
  styleUrl: './revenue.component.scss'
})
export class RevenueComponent extends BudgetCommonComponent implements OnInit {
  override budgetType = BudgetTypes.REVENUE;
}
