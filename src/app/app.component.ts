import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService, IUser} from './modules/auth/modules/shared/services/auth.service';
import {Store} from 'store';
import {Observable} from 'rxjs';
import {untilDestroyed} from 'ngx-take-until-destroy';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ultimate-ng-endcourse';

  user$: Observable<IUser> = this.store.select<IUser>('user');

  constructor(private auth: AuthService, private store: Store) {
  }

  ngOnInit(): void {
    this.auth.auth$.pipe(untilDestroyed(this)).subscribe();
  }

  ngOnDestroy(): void {
  }
}
