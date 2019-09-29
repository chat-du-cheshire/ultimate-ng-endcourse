import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {IMeal, MealsService} from '../../../shared/services/meals.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealComponent implements OnInit {

  constructor(private mealsService: MealsService, private router: Router) {
  }

  ngOnInit() {
  }

  async addMeal($event: IMeal) {
    await this.mealsService.addMeal($event);
    this.backToMeals();
  }

  backToMeals() {
    this.router.navigate(['meals']);
  }
}
