import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendListRoutingModule } from './friend-list-routing.module';
import { FriendListComponent } from './friend-list/friend-list.component';
import { antModule } from 'src/app/ant/ant.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [FriendListComponent],
  imports: [
    CommonModule,
    FriendListRoutingModule,
    antModule,
    FormsModule
  ]
})
export class FriendListModule { }
