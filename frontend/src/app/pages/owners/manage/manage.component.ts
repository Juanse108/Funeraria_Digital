import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Owner } from 'src/app/models/owner.model';
import { OwnerService } from 'src/app/services/owner.service';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer.model';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number;
  theFormGroup:FormGroup
  trySend:boolean
  owner:Owner
  customers: Customer[]
  constructor(private activateRoute: ActivatedRoute,
              private service:OwnerService,
            private router:Router,
            private theFormBuilder:FormBuilder,
            private customerService:CustomerService
          ) {
    this.customers=[]
    this.trySend=false
    this.mode = 1;
    this.owner={
      id_owner:0,
      active:"",
      id_customer:0,
    }
  }
  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({
      id_owner: [null, []],
      id_customer:[0,[Validators.required]],
      active:['',[Validators.required,]]
    })
  }
  get getTheFormGroup(){
    return this.theFormGroup.controls
  }
  customerList(){
    this.customerService.list().subscribe(data=>{
      this.customers=data
    })
  }
 
  ngOnInit(): void {
    this.customerList()
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
      this.owner.id_owner=this.activateRoute.snapshot.params.id
    }
    
    this.owner.id_owner = this.activateRoute.snapshot.params.id;
    this.getTheater(this.owner.id_owner)
  }
  getTheater(id:number){
    
    this.service.view(id).subscribe(data=>{
      this.owner=data
      console.log("Owner->"+JSON.stringify(this.owner))
    })
    
  }
  create(){
    console.log("Owner->"+JSON.stringify(this.owner))
    if (this.theFormGroup.invalid) {
      this.trySend=true
      Swal.fire("Error en el formulario","Ingrese correctamente los datos solicitados","error")
      return
    }
    this.service.create(this.owner).subscribe(data=>{
      Swal.fire("Creación Exitosa","Se ha creado un nuevo registro","success")
      this.router.navigate(["owners/list"])
    })
  }
  update(){
    if (this.theFormGroup.invalid) {
      this.trySend=true
      Swal.fire("Error en el formulario","Ingrese correctamente los datos solicitados","error")
      return
    }
    this.service.update(this.owner).subscribe(data=>{
      Swal.fire("Actualización Exitosa","Se ha actualizado el registro","success")
      this.router.navigate(["owners/list"])
    })
  }

}
