import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plan } from 'src/app/models/plan.model';
import { PlanService } from 'src/app/services/plan.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  plans: Plan []
  constructor( private service:PlanService, private router:Router) {
    this.plans = []
  }

  ngOnInit(): void {
    this.list();
  }
  list(){
    this.service.list().subscribe( data =>{
      this.plans = data
      console.log(JSON.stringify(this.plans));
    })
  }

  listSubscriptions(id:number){
    this.router.navigate(["subscriptions/list/"], { queryParams: { planId: id } })
  }
  
  listPlanServices(id:number){
    this.router.navigate(["service_plans/list/"], { queryParams: { planId: id } })
  }
  
  create(){
    this.router.navigate(['plans/create/'])
  }

  view(id:number){
    this.router.navigate(['plans/view/'+id])
  }

  update(id:number){
    this.router.navigate(['plans/update/'+id])
  }
  delete(id: number){
    Swal.fire({
      title: 'Eliminar el plan',
      text: "Está seguro que quiere eliminar el plan ",
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
      'El plan ha sido eliminado correctamente',
      'success'
      )
      this.ngOnInit();
      });
      }
      })
    };

}
