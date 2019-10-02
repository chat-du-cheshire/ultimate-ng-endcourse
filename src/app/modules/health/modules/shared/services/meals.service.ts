import {Injectable} from '@angular/core';
import {Store} from 'store';
import {AngularFireDatabase} from '@angular/fire/database';
import {AuthService} from '../../../../auth/modules/shared/services/auth.service';
import {Observable, of} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';

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
    .snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(c => ({$key: c.payload.key, ...c.payload.val()}));
      }),
      tap(next => this.store.set('meals', next))
    );

  constructor(private store: Store, private db: AngularFireDatabase, private authService: AuthService) {
  }

  get uid() {
    return this.authService.user.uid;
  }

  getMeal($key: string) {
    if (!$key) {
      return of({});
    }

    return this.store.select<IMeal[]>('meals').pipe(
      filter(Boolean),
      map(meals => meals.find(item => item.$key === $key))
    );
  }

  addMeal(meal: IMeal) {
    return this.db.list(`meals/${this.uid}`).push(meal);
  }

  updateMeal(key: string, meal: IMeal) {
    return this.db.object(`meals/${this.uid}/${key}`).update(meal);
  }

  removeMeal($key: string) {
    this.db.list(`meals/${this.uid}`).remove($key);
  }
}
