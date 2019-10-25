import {ChangeDetectionStrategy, Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

export const TYPE_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => WorkoutTypeComponent),
  multi: true
};

type WorkoutType = 'strength' | 'endurance';

@Component({
  selector: 'workout-type',
  templateUrl: './workout-type.component.html',
  styleUrls: ['./workout-type.component.scss'],
  providers: [TYPE_CONTROL_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkoutTypeComponent implements OnInit, ControlValueAccessor {

  selectors: WorkoutType[] = ['strength', 'endurance'];

  value: WorkoutType;

  private onTouch;
  private onModelChanged;

  constructor() {
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  registerOnChange(fn: any): void {
    this.onModelChanged = fn;
  }

  writeValue(value: WorkoutType): void {
    this.value = value;
  }

  ngOnInit() {
  }

  setSelected(selector: WorkoutType) {
    this.value = selector;
    this.onModelChanged(selector);
    this.onTouch();
  }
}
