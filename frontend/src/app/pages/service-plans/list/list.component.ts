import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicePlan } from 'src/app/models/service-plan.model';
import { ServicePlanService } from 'src/app/services/service-plan.service';
import { Plan } from 'src/app/models/plan.model';
import { PlanService } from 'src/app/services/plan.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  servicePlans: ServicePlan []
  servicePlans_aux: ServicePlan []
  plan: number
  constructor(private service:ServicePlanService,
      private planService: PlanService,
      private route: ActivatedRoute,
      private router:Router) {
    this.servicePlans = []
   }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.plan = params['planId'];
      this.planService.view(this.plan).subscribe(data => this.listService_plans(data));
    })
  }

  listService_plans(data: Plan){
    this.servicePlans = data["serviceplans"];
    this.servicePlans_aux = [];

    for(let ServicePlan of this.servicePlans){
      this.service.view(ServicePlan.id).subscribe(data => {
        this.servicePlans_aux.push(data);
      })
    }
  
    console.log(JSON.stringify(this.servicePlans));
  }
  create(){
    this.router.navigate(['service_plans/create/'])
  }

  view(id:number){
    this.router.navigate(['service_plans/view/'+id])
  }

  update(id:number){
    this.router.navigate(['service_plans/update/'+id])
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
