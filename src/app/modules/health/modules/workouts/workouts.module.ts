import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WorkoutsComponent} from './components/workouts/workouts.component';
import {RouterModule, Routes} from '@angular/router';
import {WorkoutComponent} from './components/workout/workout.component';
import {WorkoutFormComponent} from './components/workout-form/workout-form.component';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';

const ROUTES: Routes = [{
  path: '', component: WorkoutsComponent
}, {
  path: 'new', component: WorkoutComponent
}, {
  path: ':id', component: WorkoutComponent
}];

@NgModule({
  declarations: [WorkoutsComponent, WorkoutComponent, WorkoutFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ROUTES),
    ReactiveFormsModule
  ]
})
export class WorkoutsModule {
}
