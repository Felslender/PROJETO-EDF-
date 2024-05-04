import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentRegistrationComponent } from './components/student-registration/student-registration.component';
import { StudentLoginComponent } from './components/student-login/student-login.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';
import { KidsComponent } from './components/kids/kids.component';
import { KidsRegistrationComponent } from './components/kids-registration/kids-registration.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guard/auth.guard';
import { ClassesComponent } from './components/classes/classes.component';
import { VisitsComponent } from './components/visits/visits.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'kids', component: KidsComponent, canActivate: [AuthGuard],
    data: { expectedRoles: [3] } // 3 = ROLE_ALUNO
  },
  {
    path: 'newkids', component: KidsRegistrationComponent, canActivate: [AuthGuard],
    data: { expectedRoles: [3] }
  },
  {
    path: 'profile', component: StudentProfileComponent,
    canActivate: [AuthGuard],
    data: { expectedRoles: [3] }
  },
  // {path: 'kids', component: KidsComponent},
  // {path: 'newkids', component: KidsRegistrationComponent},
  // {path: 'profile', component: StudentProfileComponent},
  { path: 'login', component: StudentLoginComponent },
  { path: 'register', component: StudentRegistrationComponent },
  { path: 'classes', component: ClassesComponent, canActivate: [AuthGuard],   data: { expectedRoles: [3]}},
  {path: 'visits/:idClass', component: VisitsComponent, canActivate: [AuthGuard],   data: { expectedRoles: [3]}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
