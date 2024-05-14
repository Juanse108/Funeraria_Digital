import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CremationRoutingModule } from './cremation-routing.module';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    CremationRoutingModule
  ]
})
export class CremationModule { }
