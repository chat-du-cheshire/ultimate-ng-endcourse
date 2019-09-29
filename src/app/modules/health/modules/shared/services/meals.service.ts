import {Injectable} from '@angular/core';
import {Store} from 'store';
import {AngularFireDatabase} from '@angular/fire/database';
import {AuthService} from '../../../../auth/modules/shared/services/auth.service';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

export interface IMeal {
  name: string;
  ingredients: string[];
  timestamp: number;
  $key: string;
  $exists: () => boolean;
}

@Injectable()
export class MealsService {

  meals$: Observable<IMeal[]> = this.db.list<IMeal>(`meals/${this.uid}`)
    .valueChanges()
    .pipe(tap(next => this.store.set('meals', next)));

  constructor(private store: Store, private db: AngularFireDatabase, private authService: AuthService) {
  }

  get uid() {
    return this.authService.user.uid;
  }

  addMeal(meal: IMeal) {
    return this.db.list(`meals/${this.uid}`).push(meal);
  }

  removeMeal($key: string) {
    this.db.list(`meals/${this.uid}`).remove($key);
  }
}
