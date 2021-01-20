import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { antModule } from 'src/app/ant/ant.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [NotificationListComponent],
  imports: [
    CommonModule,
    antModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class NotificationModule { }
