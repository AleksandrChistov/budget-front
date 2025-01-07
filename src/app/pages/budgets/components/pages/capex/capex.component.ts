import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { TableBudgetsComponent } from "../../table-budgets/table-budgets.component";
import { BudgetCommonComponent } from '../../budget-common.component';
import { BudgetTypes } from '../../../../../shared/interfaces/budget-types.enum';

@Component({
  selector: 'app-capex',
  standalone: true,
    imports: [
        HeaderComponent,
        TableBudgetsComponent
    ],
  templateUrl: './capex.component.html',
  styleUrl: './capex.component.scss'
})
export class CapexComponent extends BudgetCommonComponent implements OnInit {
  override budgetType = BudgetTypes.CAPEX;
}
