import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';


const routes: Routes = [
  { 
    path: "list",
    component: ListComponent
   },
   {
    path: "create",
    component: ManageComponent
   }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypesRoutingModule { }
