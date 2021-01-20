import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import {VerifyOtpComponent } from './verify-otp/verify-otp.component'
@NgModule({
  declarations: [LoginComponent, VerifyOtpComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    IonicModule,
    FormsModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ]
})
export class LoginModule { }
