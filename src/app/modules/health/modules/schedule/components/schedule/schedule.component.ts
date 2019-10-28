import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {IScheduleItem, ScheduleService} from '../../../shared/services/schedule.service';
import {Store} from 'store';

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

  constructor(private store: Store, private scheduleService: ScheduleService) {
  }

  ngOnInit() {
    this.date$ = this.store.select('date');
    this.schedule$ = this.store.select('schedule');
    this.subscriptions = [
      this.scheduleService.schedule$.subscribe(),
      this.scheduleService.selected$.subscribe()
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  changeDate(date: Date) {
    this.scheduleService.updateDate(date);
  }

  changeSection($event: any) {
    this.scheduleService.selectSection($event);
  }
}
