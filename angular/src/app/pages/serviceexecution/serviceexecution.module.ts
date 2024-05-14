import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceexecutionRoutingModule } from './serviceexecution-routing.module';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    ServiceexecutionRoutingModule
  ]
})
export class ServiceexecutionModule { }
