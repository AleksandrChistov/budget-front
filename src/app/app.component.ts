import { Component, inject } from '@angular/core';
import { PrimeNG } from 'primeng/config';
import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
import { MenuComponent } from './shared/components/menu/menu.component';

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
  imports: [MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {
  public config: PrimeNG = inject(PrimeNG);

  constructor() {
    this.config.theme.set({ preset: MyPreset });
  }
}
