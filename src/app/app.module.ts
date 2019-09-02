import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AuthModule} from './modules/auth/auth.module';
import {Store} from 'store';
import {HeaderComponent} from './components/header/header.component';
import {NavComponent} from './components/nav/nav.component';
import {HealthModule} from './modules/health/health.module';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [{path: '', pathMatch: 'full', redirectTo: 'schedule'}];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    HealthModule,
    RouterModule.forRoot(routes),
  ],
  providers: [Store],
  bootstrap: [AppComponent]
})
export class AppModule {
}
