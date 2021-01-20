import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkRoutingModule } from './work-routing.module';
import { AddWorkModalComponent } from './add-work-modal/add-work-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { antModule } from 'src/app/ant/ant.module';
import { WorkDetailComponent } from './work-detail/work-detail.component';
import { SharedModule } from 'src/app/shared.module';


@NgModule({
  declarations: [AddWorkModalComponent, WorkDetailComponent],
  imports: [
    CommonModule,
    WorkRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    antModule,
    SharedModule
  ]
})
export class WorkModule { }
