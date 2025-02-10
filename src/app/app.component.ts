import { Component, inject } from '@angular/core';
import { PrimeNG } from 'primeng/config';
import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
import { MenuComponent } from './shared/components/menu/menu.component';
import { RouterOutlet } from '@angular/router';
import { Button } from 'primeng/button';
import { AuthService } from './shared/services/auth.service';
import { Tooltip } from 'primeng/tooltip';

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
  imports: [MenuComponent, RouterOutlet, Button, Tooltip],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {
  private config: PrimeNG = inject(PrimeNG);
  private authService = inject(AuthService);

  constructor() {
    this.config.theme.set({ preset: MyPreset });
  }

  public logout(): void {
    this.authService.logout();
  }
}
