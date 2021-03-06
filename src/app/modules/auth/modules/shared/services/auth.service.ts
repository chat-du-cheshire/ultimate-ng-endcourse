import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Store} from 'store';
import {tap} from 'rxjs/operators';

export interface IUser {
  email: string;
  uid: string;
  authenticated: boolean;
}

@Injectable()
export class AuthService {

  auth$ = this.af.authState.pipe(tap((next) => {
    if (!next) {
      this.store.set('user', null);
      return;
    }

    const user: IUser = {
      email: next.email,
      uid: next.uid,
      authenticated: true
    };
    this.store.set('user', user);
  }));

  get user() {
    return this.af.auth.currentUser;
  }

  get authState() {
    return this.af.authState;
  }

  constructor(private af: AngularFireAuth, private store: Store) {
  }

  createUser(email: string, password: string) {
    return this.af.auth.createUserWithEmailAndPassword(email, password);
  }

  loginUser(email: string, password: string) {
    return this.af.auth.signInWithEmailAndPassword(email, password);
  }

  logoutUser() {
    return this.af.auth.signOut();
  }
}
