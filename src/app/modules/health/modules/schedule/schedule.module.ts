import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScheduleComponent} from './components/schedule/schedule.component';
import {RouterModule, Routes} from '@angular/router';
import {ScheduleCalendarComponent} from './components/schedule-calendar/schedule-calendar.component';
import {ScheduleDaysComponent} from './components/schedule-days/schedule-days.component';
import {ScheduleControlsComponent} from './components/schedule-controls/schedule-controls.component';
import {ScheduleSectionComponent} from './components/schedule-section/schedule-section.component';
import {SharedModule} from '../shared/shared.module';

const ROUTES: Routes = [{
  path: '',
  component: ScheduleComponent
}];

@NgModule({
  declarations: [ScheduleComponent, ScheduleCalendarComponent, ScheduleDaysComponent, ScheduleControlsComponent, ScheduleSectionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule
  ]
})
export class ScheduleModule {
}
