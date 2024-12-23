import { Component, input, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { Card } from 'primeng/card';
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
export class TotalCardComponent implements OnInit {
  title = input.required<string>();
  actual = input.required<number>();
  plan = input.required<number>();
  amountPercent!: number;

  ngOnInit() {
    this.amountPercent = +((this.actual() - this.plan()) / this.plan() * 100).toFixed(1);
  }
}
