import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const ROUTES: Routes = [{
  path: 'meals',
  loadChildren: () => import('./modules/meals/meals.module').then(m => m.MealsModule)
}, {
  path: 'schedule',
  loadChildren: () => import('./modules/schedule/schedule.module').then(m => m.ScheduleModule)
}, {
  path: 'workouts',
  loadChildren: () => import('./modules/workouts/workouts.module').then(m => m.WorkoutsModule)
}];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ]
})
export class HealthModule {
}
