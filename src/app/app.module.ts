import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

/*
// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAtCIkSa3xZnVi93nuGZbdjurIL9_9v6IU",
    authDomain: "fitness-app-eb74a.firebaseapp.com",
    databaseURL: "https://fitness-app-eb74a.firebaseio.com",
    projectId: "fitness-app-eb74a",
    storageBucket: "fitness-app-eb74a.appspot.com",
    messagingSenderId: "701362197247",
    appId: "1:701362197247:web:d2884f677bfb7315"
  };
*/
