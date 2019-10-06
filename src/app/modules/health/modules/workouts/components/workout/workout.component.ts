import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {IWorkout, WorkoutsService} from '../../../shared/services/workouts.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkoutComponent implements OnInit, OnDestroy {

  workout$: Observable<IWorkout>;
  private subscription: Subscription;

  constructor(private workoutsService: WorkoutsService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.workoutsService.workouts$.subscribe();
    this.workout$ = this.route.params.pipe(switchMap(params => this.workoutsService.getWorkout(params.id)));
  }

  async addWorkout($event: IWorkout) {
    await this.workoutsService.addWorkout($event);
    this.backToWorkouts();
  }

  backToWorkouts() {
    this.router.navigate(['workouts']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async updateWorkout($event: IWorkout) {
    const key = this.route.snapshot.params.id;
    await this.workoutsService.updateWorkout(key, $event);
    this.backToWorkouts();
  }

  async removeWorkout($event: any) {
    const key = this.route.snapshot.params.id;
    await this.workoutsService.removeWorkout(key);
    this.backToWorkouts();
  }
}
