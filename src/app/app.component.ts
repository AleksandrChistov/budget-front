import { Component, inject } from '@angular/core';
import { PrimeNG } from 'primeng/config';
import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
import { MenuComponent } from './shared/components/menu/menu.component';
import { TotalCardComponent } from './shared/components/total-card/total-card.component';
import { ChartCardComponent } from './shared/components/chart-card/chart-card.component';
import { ChartCardData } from './shared/components/chart-card/chart-card.interface';

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{indigo.50}',
      100: '{indigo.100}',
      200: '{indigo.200}',
      300: '{indigo.300}',
      400: '{indigo.400}',
      500: '{indigo.500}',
      600: '{indigo.600}',
      700: '{indigo.700}',
      800: '{indigo.800}',
      900: '{indigo.900}',
      950: '{indigo.950}'
    }
  }
});

@Component({
  selector: 'app-root',
  imports: [MenuComponent, TotalCardComponent, ChartCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {
  public config: PrimeNG = inject(PrimeNG);

  public chartData: ChartCardData = {
    title: "Чистая прибыль",
    plan: [null, 0, 151500, 155000, 165000, 180000, 185000, 190000, 200000, 250000, 275000, 300000],
    fact: [0, 5000, 100500, 150000, 165000, 200000, 185000, 195000, 250000, 350000, 375000, 500550.50],
  }

  constructor() {
    this.config.theme.set({ preset: MyPreset });
  }
}
