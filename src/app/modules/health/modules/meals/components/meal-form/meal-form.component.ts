import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {IMeal} from '../../../shared/services/meals.service';
import {FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealFormComponent implements OnInit, OnChanges {

  @Input() meal: IMeal;

  form = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array([''])
  });

  @Output() create = new EventEmitter<IMeal>();
  @Output() update = new EventEmitter<IMeal>();
  @Output() remove = new EventEmitter<IMeal>();
  exists = false;
  toggled = false;

  constructor(private fb: FormBuilder) {
  }

  get ingredients(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }

  get required() {
    return this.form.get('name').hasError('required') && this.form.get('name').touched;
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.meal && this.meal.name) {
      this.exists = true;
      this.emptyIngredients();

      this.form.patchValue(this.meal);

      if (this.meal.ingredients) {
        for (const item of this.meal.ingredients) {
          this.ingredients.push(new FormControl(item));
        }
      }
    }
  }

  toggle() {
    this.toggled = !this.toggled;
  }

  removeIngredient(i: number) {
    this.ingredients.removeAt(i);
  }

  addIngredient() {
    this.ingredients.push(new FormControl(''));
  }

  createMeal() {
    if (this.form.valid) {
      this.create.next(this.form.value);
    }
  }

  updateMeal() {
    if (this.form.valid) {
      this.update.next(this.form.value);
    }
  }

  removeMeal() {
    this.remove.next(this.form.value);
  }

  private emptyIngredients() {
    while (this.ingredients.controls.length) {
      this.ingredients.removeAt(0);
    }
  }
}
