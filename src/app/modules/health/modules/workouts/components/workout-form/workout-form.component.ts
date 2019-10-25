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
    type: 'strength'
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
      // this.emptyIngredients();

      this.form.patchValue(this.workout);

      // if (this.workout.ingredients) {
      //   for (const item of this.workout.ingredients) {
      //     this.ingredients.push(new FormControl(item));
      //   }
      // }
    }
  }

  toggle() {
    this.toggled = !this.toggled;
  }

  //
  // removeIngredient(i: number) {
  //   this.ingredients.removeAt(i);
  // }
  //
  // addIngredient() {
  //   this.ingredients.push(new FormControl(''));
  // }

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

  // private emptyIngredients() {
  //   while (this.ingredients.controls.length) {
  //     this.ingredients.removeAt(0);
  //   }
  // }
}
