import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {IWorkout} from '../../../shared/services/workouts.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkoutFormComponent implements OnInit, OnChanges {

  @Input() workout: IWorkout;

  form = this.fb.group({
    name: ['', Validators.required],
    type: 'strength',
    strength: this.fb.group({
      reps: 0,
      sets: 0,
      weight: 0
    }),
    endurance: this.fb.group({
      distance: 0,
      duration: 0
    })
  });

  @Output() create = new EventEmitter<IWorkout>();
  @Output() update = new EventEmitter<IWorkout>();
  @Output() remove = new EventEmitter<IWorkout>();
  exists = false;
  toggled = false;

  constructor(private fb: FormBuilder) {
  }

  // get ingredients(): FormArray {
  //   return this.form.get('ingredients') as FormArray;
  // }

  get required() {
    return this.form.get('name').hasError('required') && this.form.get('name').touched;
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.workout && this.workout.name) {
      this.exists = true;

      this.form.patchValue(this.workout);

    }
  }

  toggle() {
    this.toggled = !this.toggled;
  }

  createWorkout() {
    if (this.form.valid) {
      this.create.next(this.form.value);
    }
  }

  updateWorkout() {
    if (this.form.valid) {
      this.update.next(this.form.value);
    }
  }

  removeWorkout() {
    this.remove.next(this.form.value);
  }

  get placeholder(): string {
    return `e.g. ${this.form.get('type').value === 'strength' ? 'Bench press' : 'Treadmill'}`;
  }
}
