import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth/modules/shared/services/auth.guard';
import {SharedModule} from './modules/shared/shared.module';

const ROUTES: Routes = [{
  path: 'meals',
  canActivate: [AuthGuard],
  loadChildren: () => import('./modules/meals/meals.module').then(m => m.MealsModule)
}, {
  path: 'schedule',
  canActivate: [AuthGuard],
  loadChildren: () => import('./modules/schedule/schedule.module').then(m => m.ScheduleModule)
}, {
  path: 'workouts',
  canActivate: [AuthGuard],
  loadChildren: () => import('./modules/workouts/workouts.module').then(m => m.WorkoutsModule)
}];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    SharedModule.forRoot()
  ]
})
export class HealthModule {
}
