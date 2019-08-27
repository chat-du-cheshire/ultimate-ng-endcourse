import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScheduleComponent} from './components/schedule/schedule.component';
import {RouterModule, Routes} from '@angular/router';

const ROUTES: Routes = [{
  path: '',
  component: ScheduleComponent
}];

@NgModule({
  declarations: [ScheduleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class ScheduleModule {
}
