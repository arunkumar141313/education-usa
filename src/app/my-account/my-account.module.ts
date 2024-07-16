import { NgModule } from '@angular/core';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { InterviewDetailsComponent } from './components/interview-details/interview-details.component';
import { MyAccountRoutingModule } from './my-account-routing.module';
import { CoreModule } from '../core-module/core.module';
import { SharedModule } from '../shared-module/shared.module';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';

@NgModule({
  declarations: [
    InterviewDetailsComponent,
    UserDetailsComponent,
    LoginComponent,
    ForgotPasswordComponent,
    MyProfileComponent
  ],
  imports: [
    MyAccountRoutingModule,
    CoreModule,
    SharedModule
  ],
  exports: [
  ]
})
export class MyAccountModule { }
