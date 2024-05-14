import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeadLineRoutingModule } from './head-line-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    HeadLineRoutingModule
  ]
})
export class HeadLineModule { }