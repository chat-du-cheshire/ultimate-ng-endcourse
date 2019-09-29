import {Component, OnDestroy, OnInit} from '@angular/core';
import {IMeal, MealsService} from '../../../shared/services/meals.service';
import {Observable, Subscription} from 'rxjs';
import {Store} from 'store';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})
export class MealsComponent implements OnInit, OnDestroy {

  meals$: Observable<IMeal[]>;
  subscription: Subscription;

  constructor(private mealsService: MealsService, private store: Store) {
  }

  ngOnInit() {
    this.meals$ = this.store.select<IMeal[]>('meals');
    this.subscription = this.mealsService.meals$.subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  removeMeal($event: IMeal) {
    this.mealsService.removeMeal($event.$key);
  }
}
