import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VN_CountDown,VN_CountDownLarge,VN_DatePipe,VN_DateTimePipe,VN_HourPipe,VN_WeekDayPipe } from './_pipe/VND_format.pipe'
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { antModule } from './ant/ant.module';

@NgModule({
  declarations: [
    VN_CountDown,
    VN_CountDownLarge,
    VN_DatePipe,
    VN_DateTimePipe,
    VN_HourPipe,
    VN_WeekDayPipe

  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    antModule
  ],
  exports: [
    VN_CountDown,
    VN_CountDownLarge,
    VN_DatePipe,
    VN_DateTimePipe,
    VN_HourPipe,
    VN_WeekDayPipe,
    antModule
  ] 
})
export class SharedModule { }
