import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceRoutingModule } from './service-routing.module';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    ServiceRoutingModule
  ]
})
export class ServiceModule { }
