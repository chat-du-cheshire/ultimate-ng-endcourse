import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
