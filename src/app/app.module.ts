import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrderListComponent } from './order-list/order-list.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    OrderFormComponent,
    OrderListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

const firebaseConfig = {
  apiKey: "AIzaSyBZ-nwt7iD6KUzPl-ib_XsmnV67TRqm5pY",
  authDomain: "girls-scout-cookies-tracker.firebaseapp.com",
  projectId: "girls-scout-cookies-tracker",
  storageBucket: "girls-scout-cookies-tracker.appspot.com",
  messagingSenderId: "279209910836",
  appId: "1:279209910836:web:ce8436ea613482f73de061",
  measurementId: "G-YPD4PW87XT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);