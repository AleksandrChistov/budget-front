import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { Option } from '../../../../../shared/interfaces/option.interface';

@Component({
  selector: 'app-revenue',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  templateUrl: './revenue.component.html',
  styleUrl: './revenue.component.scss'
})
export class RevenueComponent {
  departments: Array<Option<number>> = [
    { label: 'Сибирский филиал', id: 1 },
    { label: 'Московский филиал', id: 2 }
  ]; // TODO replace with DB values
  budgets: Array<Option<number>> = [
    { label: 'Версия №1 от 19.12.24', id: 1 },
    { label: 'Версия №2 от 20.12.24', id: 2 },
    { label: 'Версия №3 от 20.12.24', id: 3 },
  ]; // TODO replace with DB values
}
