import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { TableBudgetsComponent } from '../../table-budgets/table-budgets.component';
import { BudgetCommonComponent } from '../../budget-common.component';
import { BudgetTypes } from '../../../../../shared/interfaces/budget-types.enum';

@Component({
  selector: 'app-capital',
  standalone: true,
  imports: [
    HeaderComponent,
    TableBudgetsComponent
  ],
  templateUrl: './capital.component.html',
  styleUrl: './capital.component.scss'
})
export class CapitalComponent extends BudgetCommonComponent implements OnInit {
  override budgetType = BudgetTypes.CAPITAL;
}
