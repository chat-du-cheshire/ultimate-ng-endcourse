import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'schedule-days',
  templateUrl: './schedule-days.component.html',
  styleUrls: ['./schedule-days.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleDaysComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}