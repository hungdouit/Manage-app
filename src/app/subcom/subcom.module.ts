import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { DayDetailComponent } from './day-detail/day-detail.component';
import { ProfileModalComponent } from './profile-modal/profile-modal.component';
import { antModule } from '../ant/ant.module';
@NgModule({
  declarations: [CalendarComponent, DayDetailComponent, ProfileModalComponent],
  imports: [
    CommonModule,
    antModule
  ],
  exports: [
    CalendarComponent,
  ]
})
export class SubcomModule { }
