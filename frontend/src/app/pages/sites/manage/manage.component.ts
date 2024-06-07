import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Site } from 'src/app/models/site.model';
import { SiteService } from 'src/app/services/site.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number;
  theFormGroup:FormGroup
  trySend:boolean;
  site:Site
  constructor(private activateRoute: ActivatedRoute,
              private service:SiteService,
            private router:Router
            ,private theFormBuilder:FormBuilder
          ) {
    this.trySend=false
    this.mode = 1;
    this.site={
      id_site_mortuary:0,
      direction:"",
      city:"",
      phone:0,
      rooms_number:0,
      office_hour:""
    }
  }
  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({
      direction:[0,[Validators.required, Validators.maxLength(50) ]],
      city:['',[Validators.required]],
      phone:[0,[Validators.required,Validators.min(3000000000),Validators.max(3999999999) ]],
      rooms_number:[0,[Validators.required,Validators.min(1),Validators.max(12)]],
      office_hour:['',[Validators.required, Validators.pattern(/^\d{2}:\d{2}$/)]]
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
      this.site.id_site_mortuary=this.activateRoute.snapshot.params.id
      this.getTheater(this.site.id_site_mortuary)
    }
  }
  getTheater(id:number){
    this.service.view(id).subscribe(data=>{
      this.site=data
      console.log("Site->"+JSON.stringify(this.site))
    })
    
  }
  create(){
    console.log(this.site)
    if (this.theFormGroup.invalid) {
      this.trySend=true
      Swal.fire("Error en el formulario","Ingrese correctamente los datos solicitados","error")
      return
    }
    this.service.create(this.site).subscribe(data=>{
      Swal.fire("Creación Exitosa","Se ha creado un nuevo registro","success")
      this.router.navigate(["sites/list"])
    })
  }
  update(){
    if (this.theFormGroup.invalid) {
      this.trySend=true
      Swal.fire("Error en el formulario","Ingrese correctamente los datos solicitados","error")
      return
    }
    this.service.update(this.site).subscribe(data=>{
      Swal.fire("Actualización Exitosa","Se ha actualizado el registro","success")
      this.router.navigate(["sites/list"])
    })
  }

}
