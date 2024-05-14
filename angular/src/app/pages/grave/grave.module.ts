import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraveRoutingModule } from './grave-routing.module';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    GraveRoutingModule
  ]
})
export class GraveModule { }
