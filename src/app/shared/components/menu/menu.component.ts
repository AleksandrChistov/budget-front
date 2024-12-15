import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MenuModule,
    RippleModule,
    AvatarModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        items: [
          {
            label: 'Отчеты',
            routerLink: 'reports',
          },
          {
            label: 'Операции',
            routerLink: 'transactions',
          }
        ]
      },
      {
        label: 'Бюджеты',
        items: [
          {
            label: 'Выручка',
            routerLink: 'budgets/revenue',
          },
          {
            label: 'Расходы',
            routerLink: 'budgets/expenses',
          },
          {
            label: 'Инвестиции',
            routerLink: 'budgets/capex',
          },
          {
            label: 'Капитал',
            routerLink: 'budgets/capital',
          }
        ]
      },
    ];
  }
}
