import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule} from './modules/auth/auth.module';
import {Store} from 'store';
import {HeaderComponent} from './components/header/header.component';
import {NavComponent} from './components/nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule
  ],
  providers: [Store],
  bootstrap: [AppComponent]
})
export class AppModule { }
