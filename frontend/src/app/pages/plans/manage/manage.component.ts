import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Plan } from 'src/app/models/plan.model';
import { PlanService } from 'src/app/services/plan.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number;
  theFormGroup:FormGroup
  trySend:boolean;
  plan:Plan
  constructor(private activateRoute: ActivatedRoute,
              private service:PlanService,
            private router:Router
            ,private theFormBuilder:FormBuilder
          ) {
    this.trySend=false
    this.mode = 1;
    this.plan={
      id_plan:0,
      name:"",
      description:"",
      price:0,
      number_beneficiaries:0
    }
  }
  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({
      name:["",[Validators.required,Validators.minLength(3), Validators.maxLength(24)]],
      description:["",[Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      price:[0,[Validators.required, Validators.min(100),Validators.max(10000000000)]],
      number_beneficiaries:[0,[Validators.required,Validators.min(1),Validators.max(10) ]]
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
      this.plan.id_plan=this.activateRoute.snapshot.params.id
      this.getTheater(this.plan.id_plan)
    }
  }
  getTheater(id:number){
    this.service.view(id).subscribe(data=>{
      this.plan=data
      console.log("Plan->"+JSON.stringify(this.plan))
    })
    
  }
  create(){
    if (this.theFormGroup.invalid) {
      this.trySend=true
      Swal.fire("Error en el formulario","Ingrese correctamente los datos solicitados","error")
      return
    }
    this.service.create(this.plan).subscribe(data=>{
      Swal.fire("Creación Exitosa","Se ha creado un nuevo registro","success")
      this.router.navigate(["plans/list"])
    })
  }
  update(){
    if (this.theFormGroup.invalid) {
      this.trySend=true
      Swal.fire("Error en el formulario","Ingrese correctamente los datos solicitados","error")
      return
    }
    this.service.update(this.plan).subscribe(data=>{
      Swal.fire("Actualización Exitosa","Se ha actualizado el registro","success")
      this.router.navigate(["plans/list"])
    })
  }


}
