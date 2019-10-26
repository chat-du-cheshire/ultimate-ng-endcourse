import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'schedule-days',
  templateUrl: './schedule-days.component.html',
  styleUrls: ['./schedule-days.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleDaysComponent implements OnInit {

  days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  @Input() selected: number;

  @Output() select = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit() {
  }

  selectDay(i: number) {
    this.select.emit(i);
  }
}
