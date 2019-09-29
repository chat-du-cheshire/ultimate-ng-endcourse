import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MealsComponent} from './components/meals/meals.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {MealComponent} from './components/meal/meal.component';
import {MealFormComponent} from './components/meal-form/meal-form.component';
import {ReactiveFormsModule} from '@angular/forms';

const ROUTES: Routes = [
  {path: '', component: MealsComponent},
  {path: 'new', component: MealComponent},
  {path: ':id', component: MealComponent}
];

@NgModule({
  declarations: [MealsComponent, MealComponent, MealFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ROUTES),
    ReactiveFormsModule
  ]
})
export class MealsModule {
}
