import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { TableBudgetsComponent } from "../../table-budgets/table-budgets.component";
import { BudgetCommonComponent } from '../../budget-common.component';
import { BudgetTypes } from '../../../../../shared/interfaces/budget-types.enum';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { LabelsService } from '../../../../../shared/services/labels.service';

@Component({
  selector: 'app-capex',
  standalone: true,
  templateUrl: './capex.component.html',
  styleUrl: './capex.component.scss',
  imports: [
    HeaderComponent,
    TableBudgetsComponent,
    Toast
  ],
  providers: [LabelsService, MessageService],
})
export class CapexComponent extends BudgetCommonComponent implements OnInit {
  override budgetType = BudgetTypes.CAPEX;
}
