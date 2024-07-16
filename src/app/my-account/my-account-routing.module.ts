import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterviewDetailsComponent } from './components/interview-details/interview-details.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { UserRoleGuard } from '../core-module/guards/user-role.guard';
import { UserAuthenticationGuard } from '../core-module/guards/user-authentication.guard';

const routes: Routes = [
  {
    path: '', component: MyProfileComponent, pathMatch: 'full',  canActivate: [ UserRoleGuard ]
  },
  {
    path: 'register', component: UserDetailsComponent, canActivate: [UserAuthenticationGuard]
  },
  {
    path: 'login', component: LoginComponent, canActivate: [UserAuthenticationGuard]
  },
  {
    path: 'forgot-password', component: ForgotPasswordComponent
  },
  {
    path: 'interview-details', component: InterviewDetailsComponent, canActivate: [ UserRoleGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAccountRoutingModule { }
