import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Administrator } from 'src/app/models/administrator.model';
import { AdministratorService } from 'src/app/services/administrator.service';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number;
  theFormGroup:FormGroup
  trySend:boolean
  administrator:Administrator
  users:User[]
  constructor(private activateRoute: ActivatedRoute,
              private service:AdministratorService,
              private userService:UserService,
              private router:Router
            ,private theFormBuilder:FormBuilder
          ) {
    this.trySend=false
    this.mode = 1;
    this.users=[]
    this.administrator={
      id:0,
      user_id:"",
      registration_date:"",
      status:""
    }
  }
  usersList() {
    this.userService.list().subscribe(data => {
      this.users = data
    })
  }
  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({
      id: [null, []],
      user_id:['',[Validators.required]],
      registration_date:['',[Validators.required,Validators.pattern(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/) ]],
      status:['',[Validators.required]]
    })
  }
  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  ngOnInit(): void {
    this.usersList()
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
      this.administrator.id=this.activateRoute.snapshot.params.id
      this.getTheater(this.administrator.id)
    }
  }
  getTheater(id:number){
    this.service.view(id).subscribe(data=>{
      this.administrator=data
      console.log("Administrator->"+JSON.stringify(this.administrator))
    })
    
  }
  create(){
    if (this.theFormGroup.invalid) {
      this.trySend=true
      Swal.fire("Error en el formulario","Ingrese correctamente los datos solicitados","error")
      return
    }
    this.service.create(this.administrator).subscribe(data=>{
      Swal.fire("Creación Exitosa","Se ha creado un nuevo registro","success")
      this.router.navigate(["administrators/list"])
    })
  }
  update(){
    if (this.theFormGroup.invalid) {
      this.trySend=true
      Swal.fire("Error en el formulario","Ingrese correctamente los datos solicitados","error")
      return
    }
    this.service.update(this.administrator).subscribe(data=>{
      Swal.fire("Actualización Exitosa","Se ha actualizado el registro","success")
      this.router.navigate(["administrators/list"])
    })
  }

}
