import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {IMeal} from '../../../shared/services/meals.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  addMeal($event: IMeal) {
    console.log('Meal:', $event);
  }
}
