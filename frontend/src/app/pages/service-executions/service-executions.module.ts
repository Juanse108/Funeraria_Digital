import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceExecutionsRoutingModule } from './service-executions-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    ServiceExecutionsRoutingModule
  ]
})
export class ServiceExecutionsModule { }
