import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Tab2RoutingModule } from './tab2-routing.module';
import { Tab2Component } from './tab2.component';
import { antModule } from '../ant/ant.module';
import { SharedModule } from '../shared.module';


@NgModule({
  declarations: [Tab2Component],
  imports: [
    CommonModule,
    Tab2RoutingModule,
    antModule,
    SharedModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class Tab2Module { }
