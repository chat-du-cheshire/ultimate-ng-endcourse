import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WorkoutsComponent} from './components/workouts/workouts.component';
import {RouterModule, Routes} from '@angular/router';

const ROUTES: Routes = [{
  path: '', component: WorkoutsComponent
}];

@NgModule({
  declarations: [WorkoutsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class WorkoutsModule {
}
