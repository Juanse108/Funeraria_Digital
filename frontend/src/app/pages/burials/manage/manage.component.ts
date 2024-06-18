import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Burial } from 'src/app/models/burial.model';
import { BurialService } from 'src/app/services/burial.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number;
  theFormGroup:FormGroup
  trySend:boolean;
  burial:Burial
  
  constructor(private activateRoute: ActivatedRoute,
              private service:BurialService,
            private router:Router
            ,private theFormBuilder:FormBuilder
          ) {
    this.trySend=false
    this.mode = 1;
    this.burial={
      id_burial:0,
      land_location:"",
      casket_type:"",
      id_service:0,
      id_room:0,
    }
  }
  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({
      id_burial: [null, []],
      land_location:["",[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      casket_type:["",[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      id_service:[0,[Validators.required,Validators.min(1),Validators.max(100)]],
      id_room:[0,[Validators.required,Validators.min(1),Validators.max(100)]]
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
      this.burial.id_burial=this.activateRoute.snapshot.params.id
      this.getTheater(this.burial.id_burial)
    }
  }
  getTheater(id:number){
    this.service.view(id).subscribe(data=>{
      this.burial=data
      console.log("Burial->"+JSON.stringify(this.burial))
    })
    
  }
  create(){
    if (this.theFormGroup.invalid) {
      this.trySend=true
      Swal.fire("Error en el formulario","Ingrese correctamente los datos solicitados","error")
      return
    }
    this.service.create(this.burial).subscribe(data=>{
      Swal.fire("Creación Exitosa","Se ha creado un nuevo registro","success")
      this.router.navigate(["burials/list"])
    })
  }
  update(){
    if (this.theFormGroup.invalid) {
      this.trySend=true
      Swal.fire("Error en el formulario","Ingrese correctamente los datos solicitados","error")
      return
    }
    this.service.update(this.burial).subscribe(data=>{
      Swal.fire("Actualización Exitosa","Se ha actualizado el registro","success")
      this.router.navigate(["burials/list"])
    })
  }
}
