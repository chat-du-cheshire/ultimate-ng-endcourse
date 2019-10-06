import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {IWorkout, WorkoutsService} from '../../../shared/services/workouts.service';
import {Store} from 'store';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkoutsComponent implements OnInit, OnDestroy {

  workouts$: Observable<IWorkout[]>;
  subscription: Subscription;

  constructor(private workoutsService: WorkoutsService, private store: Store) {
  }

  ngOnInit() {
    this.workouts$ = this.store.select<IWorkout[]>('workouts');
    this.subscription = this.workoutsService.workouts$.subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  removeWorkout($event: IWorkout) {
    this.workoutsService.removeWorkout($event.$key);
  }
}
