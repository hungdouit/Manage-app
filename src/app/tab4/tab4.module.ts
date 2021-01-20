import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Tab4RoutingModule } from './tab4-routing.module';
import { Tab4Component } from './tab4.component';



@NgModule({
  declarations: [Tab4Component],
  imports: [
    CommonModule,
    Tab4RoutingModule
  ]
})
export class Tab4Module { }
