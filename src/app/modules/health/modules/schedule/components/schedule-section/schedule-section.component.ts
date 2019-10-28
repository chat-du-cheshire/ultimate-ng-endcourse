import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IScheduleItem} from '../../../shared/services/schedule.service';

@Component({
  selector: 'schedule-section',
  templateUrl: './schedule-section.component.html',
  styleUrls: ['./schedule-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleSectionComponent implements OnInit {

  @Input() name: string;
  @Input() section: IScheduleItem;

  @Output()
  select = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  onSelect(type: string, assigned: string[] = []) {
    const data = this.section;
    this.select.emit({
      type,
      assigned,
      data
    });
  }
}
