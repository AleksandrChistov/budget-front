import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MenuModule,
    RippleModule,
    AvatarModule,
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
          },
          {
            label: 'Операции',
          }
        ]
      },
      {
        label: 'Бюджеты',
        items: [
          {
            label: 'Выручка',
          },
          {
            label: 'Расходы',
          },
          {
            label: 'Инвестиции',
          },
          {
            label: 'Капитал',
          }
        ]
      },
    ];
  }
}
