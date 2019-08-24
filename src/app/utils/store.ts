import {BehaviorSubject, Observable} from 'rxjs';
import {distinctUntilChanged, pluck} from 'rxjs/operators';
import {IUser} from '../modules/auth/modules/shared/services/auth.service';

export interface State {
  user: IUser;
  [key: string]: any;
}

const state: State = {
  user: undefined
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
