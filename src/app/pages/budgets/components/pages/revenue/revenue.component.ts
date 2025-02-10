import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { TableBudgetsComponent } from '../../table-budgets/table-budgets.component';
import { BudgetCommonComponent } from '../../budget-common.component';
import { BudgetTypes } from '../../../../../shared/interfaces/budget-types.enum';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-revenue',
  standalone: true,
  templateUrl: './revenue.component.html',
  styleUrl: './revenue.component.scss',
  imports: [
    HeaderComponent,
    TableBudgetsComponent,
    Toast
  ],
  providers: [MessageService],
})
export class RevenueComponent extends BudgetCommonComponent implements OnInit {
  override budgetType = BudgetTypes.REVENUE;
}
