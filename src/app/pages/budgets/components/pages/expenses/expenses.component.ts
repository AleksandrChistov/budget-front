import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { TableBudgetsComponent } from "../../table-budgets/table-budgets.component";
import { BudgetCommonComponent } from '../../budget-common.component';
import { BudgetTypes } from '../../../../../shared/interfaces/budget-types.enum';
import { Toast } from "primeng/toast";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-budgets-expenses',
  standalone: true,
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss',
  imports: [
    HeaderComponent,
    TableBudgetsComponent,
    Toast
  ],
  providers: [MessageService],
})
export class ExpensesComponent extends BudgetCommonComponent implements OnInit {
  override budgetType = BudgetTypes.EXPENSES;
}
