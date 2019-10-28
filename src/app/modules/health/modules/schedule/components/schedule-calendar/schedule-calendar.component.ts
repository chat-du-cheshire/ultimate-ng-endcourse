import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {IScheduleItem, IScheduleList} from '../../../shared/services/schedule.service';

@Component({
  selector: 'schedule-calendar',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleCalendarComponent implements OnInit, OnChanges {
  selectedDay: Date;
  selectedDayIndex: number;
  selectedWeek: Date;
  @Input() items: IScheduleList;
  @Output() select = new EventEmitter<any>();

  @Output() change = new EventEmitter<Date>();

  @Input() set date(value: Date) {
    this.selectedDay = new Date(value.getTime());
  }

  sections = [
    {key: 'morning', name: 'Morning'},
    {key: 'lunch', name: 'Lunch'},
    {key: 'evening', name: 'Evening'},
    {key: 'snacks', name: 'Snacks and Drinks'}
  ];

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(): void {
    this.selectedDayIndex = this.getToday(this.selectedDay);
    this.selectedWeek = this.getStartOfWeek(new Date(this.selectedDay));
  }

  getSection(value: string): IScheduleItem {
    return this.items && this.items[value] || {};
  }

  onChange(weekOffset: number) {
    const startOfWeek = this.getStartOfWeek(new Date());
    const startDate = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate());
    startDate.setDate(startDate.getDate() + (weekOffset * 7));
    this.change.emit(startDate);
  }

  private getStartOfWeek(date: Date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  selectDay(index: number) {
    const selectedDay = new Date(this.selectedWeek);
    selectedDay.setDate(selectedDay.getDate() + index);

    this.change.emit(selectedDay);
  }

  private getToday(date: Date) {
    const today = date.getDay() - 1;
    return today < 0 ? 6 : today;
  }

  selectSection($event: any, section: string) {
    this.select.emit({
      ...$event,
      section,
      day: this.selectedDay
    });
  }
}
