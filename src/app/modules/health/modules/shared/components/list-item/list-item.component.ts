import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemComponent implements OnInit {

  @Input() item: any;
  toggled = false;

  @Output() remove = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  removeItem() {
    this.remove.next(this.item);
  }

  toggle() {
    this.toggled = !this.toggled;
  }

  get route() {
    return [`../${this.item.ingredients ? 'meals' : 'workouts'}`, this.item.$key];
  }
}
