import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Driver } from 'src/app/models/driver.model';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number;
  theFormGroup:FormGroup
  trySend:boolean
  driver:Driver
  constructor(private activateRoute: ActivatedRoute,
              private service:DriverService,
            private router:Router
            ,private theFormBuilder:FormBuilder
          ) {
    this.trySend=false
    this.mode = 1;
    this.driver={
      id_driver:0,
      user_id:"",
      license:"",
      disponibility:"",
      years_experience:0,
      assigned_vehicle:""
    }
  }
  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({
      user_id:['',[Validators.required, Validators.minLength(24), Validators.maxLength(24)]],
      license:['',[Validators.required, Validators.maxLength(15)]],
      disponibility:['',[Validators.required,]],
      years_experience:[0,[Validators.required,Validators.min(2),Validators.max(50)]],
      assigned_vehicle:['',[Validators.required, Validators.maxLength(40)]]
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
      this.driver.id_driver=this.activateRoute.snapshot.params.id
      this.getTheater(this.driver.id_driver)
    }
  }
  getTheater(id:number){
    this.service.view(id).subscribe(data=>{
      this.driver=data
      console.log("Driver->"+JSON.stringify(this.driver))
    })
    
  }
  create(){
    if (this.theFormGroup.invalid) {
      this.trySend=true
      Swal.fire("Error en el formulario","Ingrese correctamente los datos solicitados","error")
      return
    }
    this.service.create(this.driver).subscribe(data=>{
      Swal.fire("Creación Exitosa","Se ha creado un nuevo registro","success")
      this.router.navigate(["drivers/list"])
    })
  }
  update(){
    if (this.theFormGroup.invalid) {
      this.trySend=true
      Swal.fire("Error en el formulario","Ingrese correctamente los datos solicitados","error")
      return
    }
    this.service.update(this.driver).subscribe(data=>{
      Swal.fire("Actualización Exitosa","Se ha actualizado el registro","success")
      this.router.navigate(["drivers/list"])
    })
  }

}
