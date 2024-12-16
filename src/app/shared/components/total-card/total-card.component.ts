import { Component, input } from '@angular/core';
import { Card } from 'primeng/card';
import { NgClass } from '@angular/common';
import { AmountPipe } from '../../pipes/amount.pipe';

@Component({
  selector: 'app-total-card',
  standalone: true,
  imports: [
    Card,
    NgClass,
    AmountPipe
  ],
  templateUrl: './total-card.component.html',
  styleUrl: './total-card.component.scss'
})
export class TotalCardComponent {
    title = input.required<string>();
    amount: number = 1895403;
    plan: number = 393600;
    amountPercent: number;

  constructor() {
    this.amountPercent = Math.round((this.amount - this.plan) / this.plan * 100);
  }
}
