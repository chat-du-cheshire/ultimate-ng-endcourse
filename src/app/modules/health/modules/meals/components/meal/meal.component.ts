import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {IMeal, MealsService} from '../../../shared/services/meals.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealComponent implements OnInit, OnDestroy {

  meal$: Observable<IMeal>;
  private subscription: Subscription;

  constructor(private mealsService: MealsService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.mealsService.meals$.subscribe();
    this.meal$ = this.route.params.pipe(switchMap(params => this.mealsService.getMeal(params.id)));
  }

  async addMeal($event: IMeal) {
    await this.mealsService.addMeal($event);
    this.backToMeals();
  }

  backToMeals() {
    this.router.navigate(['meals']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
