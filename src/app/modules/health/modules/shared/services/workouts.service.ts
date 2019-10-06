import {Injectable} from '@angular/core';
import {Store} from 'store';
import {AngularFireDatabase} from '@angular/fire/database';
import {AuthService} from '../../../../auth/modules/shared/services/auth.service';
import {Observable, of} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';

export interface IWorkout {
  name: string;
  type: string;
  strength: any;
  endurance: any;
  timestamp: number;
  $key: string;
  $exists: () => boolean;
}

@Injectable()
export class WorkoutsService {

  workouts$: Observable<IWorkout[]> = this.db.list<IWorkout>(`workouts/${this.uid}`)
    .snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(c => ({$key: c.payload.key, ...c.payload.val()}));
      }),
      tap(next => this.store.set('workouts', next))
    );

  constructor(private store: Store, private db: AngularFireDatabase, private authService: AuthService) {
  }

  get uid() {
    return this.authService.user.uid;
  }

  getWorkout($key: string) {
    if (!$key) {
      return of({});
    }

    return this.store.select<IWorkout[]>('workouts').pipe(
      filter(Boolean),
      map(workouts => workouts.find(item => item.$key === $key))
    );
  }

  addWorkout(workout: IWorkout) {
    return this.db.list(`workouts/${this.uid}`).push(workout);
  }

  updateWorkout(key: string, workout: IWorkout) {
    return this.db.object(`workouts/${this.uid}/${key}`).update(workout);
  }

  removeWorkout($key: string) {
    this.db.list(`workouts/${this.uid}`).remove($key);
  }
}
