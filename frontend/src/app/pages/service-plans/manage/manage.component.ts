import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicePlan } from 'src/app/models/service-plan.model';
import { ServicePlanService } from 'src/app/services/service-plan.service';
import { Plan }  from 'src/app/models/plan.model';
import { Service } from 'src/app/models/service.model';
import { PlanService } from 'src/app/services/plan.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number;
  theFormGroup:FormGroup
  trySend:boolean;
  servicePlan:ServicePlan
  plans:Plan[]
  services:Service[]
  constructor(private activateRoute: ActivatedRoute,
              private service:ServicePlanService,
              private planService:PlanService,
              private serviceService:ServiceService,
            private router:Router
            ,private theFormBuilder:FormBuilder
          ) {
    this.trySend=false
    this.mode = 1;
    this.plans=[]
    this.services=[]
    this.servicePlan={
      id:0,
      id_service:0,
      id_plan:0
    }
  }
  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({
      id: [null, []],
      id_service:[0,[Validators.required]],
      id_plan:[0,[Validators.required]],
    })
  }
  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  serviceList() {
    this.serviceService.list().subscribe(data => {
      this.services = data
    })
  }

  planList() {
    this.planService.list().subscribe(data => {
      this.plans = data
    })
  }

  ngOnInit(): void {
    this.planList()
    this.serviceList()
    this.configFormGroup()
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode=1;
    }else if(currentUrl.includes('create')){
      this.mode=2;
    }else if(currentUrl.includes('update')){
      this.mode=3;
    }
    if(this.activateRoute.snapshot.params.id){
      this.servicePlan.id=this.activateRoute.snapshot.params.id
      this.getTheater(this.servicePlan.id)
    }
  }
  getTheater(id:number){
    this.service.view(id).subscribe(data=>{
      this.servicePlan=data
      console.log("Plan->"+JSON.stringify(this.servicePlan))
    })
    
  }
  create(){
    if (this.theFormGroup.invalid) {
      this.trySend=true
      Swal.fire("Error en el formulario","Ingrese correctamente los datos solicitados","error")
      return
    }
    this.service.create(this.servicePlan).subscribe(data=>{
      Swal.fire("Creación Exitosa","Se ha creado un nuevo registro","success")
      this.router.navigate(["service_plans/list"])
    })
  }
  update(){
    if (this.theFormGroup.invalid) {
      this.trySend=true
      Swal.fire("Error en el formulario","Ingrese correctamente los datos solicitados","error")
      return
    }
    this.service.update(this.servicePlan).subscribe(data=>{
      Swal.fire("Actualización Exitosa","Se ha actualizado el registro","success")
      this.router.navigate(["service_plans/list"])
    })
  }

}
