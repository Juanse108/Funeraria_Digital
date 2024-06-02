import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentRatingsRoutingModule } from './comment-ratings-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    CommentRatingsRoutingModule
  ]
})
export class CommentRatingsModule { }
