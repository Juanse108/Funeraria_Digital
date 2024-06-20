import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocketsRoutingModule } from './sockets-routing.module';
import { ManageComponent } from './manage/manage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ManageComponent
  ],
  imports: [
    CommonModule,
    SocketsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SocketsModule { }
