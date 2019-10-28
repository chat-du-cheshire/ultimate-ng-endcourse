import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Store} from 'store';
import {map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
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
  private section$ = new Subject();
  schedule$: Observable<any> = this.date$.pipe(
    tap((next) => this.store.set('date', next)),
    map((day: Date) => {
      const startAt = new Date(day.getFullYear(), day.getMonth(), day.getDate()).getTime();
      const endAt = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1).getTime() - 1;
      return {startAt, endAt};
    }),
    switchMap(({startAt, endAt}) => this.getSchedule(startAt, endAt)),
    map((data: any) => {
      return data.reduce(
        (acc: any, value: any) => Object.assign(
          acc, !acc.hasOwnProperty(value.section) ? {[value.section]: value} : {}
        ), {});
    }),
    tap(next => this.store.set('schedule', next))
  );
  private itemList$ = new Subject();

  selected$ = this.section$.pipe(
    tap(next => this.store.set('selected', next))
  );

  list$ = this.section$.pipe(
    map((value: any) => this.store.value[value.type]),
    tap(next => this.store.set('list', next))
  );
  items$ = this.itemList$.pipe(
    withLatestFrom(this.section$),
    map(([list, section]: [any, any]) => {
      const id = section.data.$key;

      const defaults: IScheduleItem = {
        workouts: null,
        meals: null,
        section: section.section,
        timestamp: new Date(section.day).getTime()
      };

      const payload = {
        ...(id ? section.data : defaults),
        ...list
      };

      delete payload.$key;

      if (id) {
        return this.updateSection(id, payload);
      } else {
        return this.createSection(payload);
      }

    })
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

  updateItems(items: string[]) {
    this.itemList$.next(items);
  }

  selectSection(event: any) {
    this.section$.next(event);
  }

  private getSchedule(startAt: number, endAt: number) {
    return this.db.list(`schedule/${this.uid}`, (ref) => ref.orderByChild('timestamp')
      .startAt(startAt)
      .endAt(endAt)
    ).snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({$key: c.payload.key, ...c.payload.val()}));
        })
      );
  }

  private updateSection(id: string, payload: IScheduleItem) {
    return this.db.object(`schedule/${this.uid}/${id}`).update(payload);
  }

  private createSection(payload: IScheduleItem) {
    return this.db.list(`schedule/${this.uid}`).push(payload);
  }
}
