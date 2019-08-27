import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IUser} from '../../modules/auth/modules/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  @Input()
  user: IUser;

  @Output()
  logout = new EventEmitter<any>();

  constructor() {
  }

  logoutUser() {
    this.logout.emit();
  }

  ngOnInit() {
  }

}
