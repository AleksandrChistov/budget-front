import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { TableBudgetsComponent } from '../../table-budgets/table-budgets.component';
import { BudgetCommonComponent } from '../../budget-common.component';
import { BudgetTypes } from '../../../../../shared/interfaces/budget-types.enum';
import { Toast } from "primeng/toast";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-capital',
  templateUrl: './capital.component.html',
  styleUrl: './capital.component.scss',
  standalone: true,
  imports: [
    HeaderComponent,
    TableBudgetsComponent,
    Toast
  ],
  providers: [MessageService],
})
export class CapitalComponent extends BudgetCommonComponent implements OnInit {
  override budgetType = BudgetTypes.CAPITAL;
}
