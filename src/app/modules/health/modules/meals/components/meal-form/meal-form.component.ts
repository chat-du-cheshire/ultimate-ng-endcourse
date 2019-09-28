import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IMeal} from '../../../shared/services/meals.service';
import {FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealFormComponent implements OnInit {

  form = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array([''])
  });

  @Output() create = new EventEmitter<IMeal>();

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

  createMeal() {
    if (this.form.valid) {
      this.create.next(this.form.value);
    }
  }

  removeIngredient(i: number) {
    this.ingredients.removeAt(i);
  }

  addIngredient() {
    this.ingredients.push(new FormControl(''));
  }
}
