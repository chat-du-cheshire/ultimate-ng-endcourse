import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {IScheduleItem, ScheduleService} from '../../../shared/services/schedule.service';
import {Store} from 'store';
import {IMeal, MealsService} from '../../../shared/services/meals.service';
import {IWorkout, WorkoutsService} from '../../../shared/services/workouts.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleComponent implements OnInit, OnDestroy {
  date$: Observable<Date>;
  subscriptions: Subscription[] = [];
  schedule$: Observable<IScheduleItem[]>;
  selected$: Observable<any>;
  list$: Observable<IMeal[] | IWorkout[]>;
  open = false;

  constructor(private store: Store,
              private scheduleService: ScheduleService,
              private mealsService: MealsService,
              private workoutsService: WorkoutsService) {
  }

  ngOnInit() {
    this.date$ = this.store.select('date');
    this.schedule$ = this.store.select('schedule');
    this.selected$ = this.store.select('selected');
    this.list$ = this.store.select('list');

    this.subscriptions = [
      this.scheduleService.schedule$.subscribe(),
      this.scheduleService.selected$.subscribe(),
      this.scheduleService.list$.subscribe(),
      this.mealsService.meals$.subscribe(),
      this.workoutsService.workouts$.subscribe()
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  changeDate(date: Date) {
    this.scheduleService.updateDate(date);
  }

  changeSection($event: any) {
    this.open = true;
    this.scheduleService.selectSection($event);
  }
}
