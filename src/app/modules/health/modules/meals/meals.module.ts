import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MealsComponent} from './components/meals/meals.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {MealComponent} from './components/meal/meal.component';

const ROUTES: Routes = [
  {path: '', component: MealsComponent},
  {path: 'new', component: MealComponent}
];

@NgModule({
  declarations: [MealsComponent, MealComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class MealsModule {
}
