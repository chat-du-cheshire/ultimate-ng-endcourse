import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AngularFireModule, FirebaseAppConfig} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {SharedModule} from './modules/shared/shared.module';


// Your web app's Firebase configuration
export const firebaseConfig: FirebaseAppConfig = {
  apiKey: 'AIzaSyAtCIkSa3xZnVi93nuGZbdjurIL9_9v6IU',
  authDomain: 'fitness-app-eb74a.firebaseapp.com',
  databaseURL: 'https://fitness-app-eb74a.firebaseio.com',
  projectId: 'fitness-app-eb74a',
  storageBucket: 'fitness-app-eb74a.appspot.com',
  messagingSenderId: '701362197247',
  appId: '1:701362197247:web:d2884f677bfb7315'
};


const routes: Routes = [
  {
    path: 'auth', children: [
      {path: '', pathMatch: 'full', redirectTo: 'login'},
      {path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)},
      {path: 'register', loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule)}
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule.forRoot()
  ]
})
export class AuthModule {
}
