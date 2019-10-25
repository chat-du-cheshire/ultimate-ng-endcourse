import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {MealsService} from './services/meals.service';
import {ListItemComponent} from './components/list-item/list-item.component';
import {WorkoutsService} from './services/workouts.service';
import {JoinPipe} from './pipes/join.pipe';
import {WorkoutPipe} from './pipes/workout.pipe';
import {ScheduleService} from './services/schedule.service';


@NgModule({
  declarations: [ListItemComponent, JoinPipe, WorkoutPipe],
  exports: [ListItemComponent, JoinPipe, WorkoutPipe],
  imports: [
    CommonModule,
    RouterModule,
    AngularFireDatabaseModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [MealsService, WorkoutsService, ScheduleService]
    };
  }
}
