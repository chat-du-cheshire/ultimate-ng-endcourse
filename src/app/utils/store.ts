import {BehaviorSubject, Observable} from 'rxjs';
import {distinctUntilChanged, pluck} from 'rxjs/operators';
import {IUser} from '../modules/auth/modules/shared/services/auth.service';
import {IMeal} from '../modules/health/modules/shared/services/meals.service';
import {IWorkout} from '../modules/health/modules/shared/services/workouts.service';
import {IScheduleItem} from '../modules/health/modules/shared/services/schedule.service';

export interface State {
  user: IUser;
  meals: IMeal[];
  workouts: IWorkout[];
  date: Date;
  schedule: IScheduleItem[];
  selected: any;

  [key: string]: any;
}

const state: State = {
  user: undefined,
  meals: undefined,
  workouts: undefined,
  date: undefined,
  schedule: undefined,
  selected: undefined
};

export class Store {

  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable()
    .pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(pluck(name));
  }

  set(name: string, newState: any) {
    this.subject.next({ ...this.value, [name]: newState });
  }

}
