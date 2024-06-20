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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicePlanService: ServicePlanService,
    private planService: PlanService,
  ) {
    this.servicePlans = []
  }

  ngOnInit(): void {
    this.listServicePlans()
  }

  listServicePlans() {
    this.route.queryParams.subscribe(params => {
      this.plan = params['planId'];
      
      if (this.plan != null) {
        this.planService.view(this.plan).subscribe(data => {
          this.servicePlans = data["serviceplans"];
        })
      } else {
        this.servicePlanService.list().subscribe(data => {
          this.servicePlans = data
        })
      }
    })
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
      this.servicePlanService.delete(id).
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
