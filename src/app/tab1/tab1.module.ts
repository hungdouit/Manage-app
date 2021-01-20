import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Tab1RoutingModule } from './tab1-routing.module';
import { Tab1Component } from './tab1.component';
import { SubcomModule } from '../subcom/subcom.module';
import { antModule } from '../ant/ant.module';
import { SharedModule } from '../shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [Tab1Component],
  imports: [
    CommonModule,
    Tab1RoutingModule,
    SubcomModule,
    antModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class Tab1Module { }
