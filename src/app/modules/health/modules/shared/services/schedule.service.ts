import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Store} from 'store';
import {map, switchMap, tap} from 'rxjs/operators';
import {IMeal} from './meals.service';
import {IWorkout} from './workouts.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {AuthService} from '../../../../auth/modules/shared/services/auth.service';

export interface IScheduleItem {
  meals: IMeal[];
  workouts: IWorkout[];
  section: string;
  timestamp: number;
  $key?: string;
}


export interface IScheduleList {
  morning?: IScheduleItem;
  lunch?: IScheduleItem;
  evening?: IScheduleItem;
  snacks?: IScheduleItem;

  [key: string]: any;
}

@Injectable()
export class ScheduleService {

  private date$ = new BehaviorSubject<Date>(new Date());

  schedule$: Observable<any> = this.date$.pipe(
    tap((next) => this.store.set('date', next)),
    map((day: Date) => {
      const startAt = new Date(day.getFullYear(), day.getMonth(), day.getDate()).getTime();
      const endAt = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1).getTime() - 1;
      return {startAt, endAt};
    }),
    switchMap(({startAt, endAt}) => this.getSchedule(startAt, endAt)),
    map((data: any) => {
      return Object.values(data)
        .reduce((acc: any, value: any) => Object.assign(
          acc, acc.hasOwnProperty(value.section) ? {[value.section]: value} : {}
        ), {});
    }),
    tap(next => this.store.set('schedule', next))
  );

  constructor(private store: Store,
              private db: AngularFireDatabase,
              private authService: AuthService) {
  }

  get uid() {
    return this.authService.user.uid;
  }

  updateDate(date: Date) {
    this.date$.next(date);
  }

  private getSchedule(startAt: number, endAt: number) {
    return this.db.list(`schedule/${this.uid}`, (ref) => ref.orderByChild('timestamp')
      .startAt(startAt)
      .endAt(endAt)
    ).valueChanges();
  }
}
