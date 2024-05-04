import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentRegistrationComponent } from './components/student-registration/student-registration.component';
import { KidsRegistrationComponent } from './components/kids-registration/kids-registration.component';
import { StudentLoginComponent } from './components/student-login/student-login.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { KidsComponent } from './components/kids/kids.component';
import { HomeComponent } from './components/home/home.component';
import { ClassesComponent } from './components/classes/classes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { VisitsComponent } from './components/visits/visits.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentRegistrationComponent,
    KidsRegistrationComponent,
    StudentLoginComponent,
    StudentProfileComponent,
    NavbarComponent,
    KidsComponent,
    HomeComponent,
    ClassesComponent,
    VisitsComponent,
  ],
  imports: [
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'),
      },
    }),
    BrowserAnimationsModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
