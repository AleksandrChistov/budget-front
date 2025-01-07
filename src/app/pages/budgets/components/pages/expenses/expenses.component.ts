import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { TableBudgetsComponent } from "../../table-budgets/table-budgets.component";
import { BudgetCommonComponent } from '../../budget-common.component';
import { BudgetTypes } from '../../../../../shared/interfaces/budget-types.enum';

@Component({
  selector: 'app-budgets-expenses',
  standalone: true,
    imports: [
        HeaderComponent,
        TableBudgetsComponent
    ],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss'
})
export class ExpensesComponent extends BudgetCommonComponent implements OnInit {
  override budgetType = BudgetTypes.EXPENSES;
}
