import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MealsComponent} from './components/meals/meals.component';
import {RouterModule, Routes} from '@angular/router';

const ROUTES: Routes = [{path: '', component: MealsComponent}];

@NgModule({
  declarations: [MealsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class MealsModule {
}
