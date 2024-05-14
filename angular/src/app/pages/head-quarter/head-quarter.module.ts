import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeadQuarterRoutingModule } from './head-quarter-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    HeadQuarterRoutingModule
  ]
})
export class HeadQuarterModule { }
