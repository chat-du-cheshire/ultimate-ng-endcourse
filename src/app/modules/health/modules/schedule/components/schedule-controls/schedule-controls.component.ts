import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'schedule-controls',
  templateUrl: './schedule-controls.component.html',
  styleUrls: ['./schedule-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleControlsComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
