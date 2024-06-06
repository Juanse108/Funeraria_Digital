import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicePlan } from 'src/app/models/service-plan.model';
import { ServicePlanService } from 'src/app/services/service-plan.service';

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
  constructor(private activateRoute: ActivatedRoute,
              private service:ServicePlanService,
            private router:Router
            ,private theFormBuilder:FormBuilder
          ) {
    this.trySend=false
    this.mode = 1;
    this.servicePlan={
      id:0,
      id_service:0,
      id_plan:0
    }
  }
  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({
      id_service:[0,[Validators.required,Validators.min(1),Validators.max(100)]],
      id_plan:[0,[Validators.required,Validators.min(1),Validators.max(100)]],
    })
  }
  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  ngOnInit(): void {
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
