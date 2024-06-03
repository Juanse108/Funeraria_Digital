import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicePlan } from 'src/app/models/service-plan.model';
import { ServicePlanService } from 'src/app/services/service-plan.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  servicePlans: ServicePlan []
  constructor(private service:ServicePlanService, private router:Router) {
    this.servicePlans = []
   }

   ngOnInit(): void {
    this.list();
  }
  list(){
    this.service.list().subscribe( data =>{
      this.servicePlans = data
      console.log(JSON.stringify(this.servicePlans));
    })
  }
  create(){
    this.router.navigate(['messages/create/'])
  }

  view(id:number){
    this.router.navigate(['messages/view/'+id])
  }

  update(id:number){
    this.router.navigate(['messages/update/'+id])
  }
  delete(id: number){
    Swal.fire({
      title: 'Eliminar el servicePlan',
      text: "Está seguro que quiere eliminar el servicePlan ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, Cancelar'
      }).then((result) => {
      if (result.isConfirmed) {
      this.service.delete(id).
      subscribe(data => {
      Swal.fire(
      'Eliminado!',
      'El servicePlans ha sido eliminado correctamente',
      'success'
      )
      this.ngOnInit();
      });
      }
      })
    };

}
