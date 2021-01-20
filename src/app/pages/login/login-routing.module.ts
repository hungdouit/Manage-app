import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component'
const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'otp', component: VerifyOtpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
