import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Tab3RoutingModule } from './tab3-routing.module';
import { Tab3Component } from './tab3.component';
import { SubcomModule } from '../subcom/subcom.module';
import { antModule } from '../ant/ant.module';
import { SharedModule } from '../shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [Tab3Component],
  imports: [
    CommonModule,
    Tab3RoutingModule,
    SubcomModule,
    antModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class Tab3Module { }
