import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Beneficiary } from 'src/app/models/beneficiary.model';
import { BeneficiaryService } from 'src/app/services/beneficiary.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number;
  theFormGroup:FormGroup
  trySend:boolean;
  beneficiary:Beneficiary
  constructor(private activateRoute: ActivatedRoute,
              private service:BeneficiaryService,
            private router:Router
            ,private theFormBuilder:FormBuilder
          ) {
    this.trySend=false
    this.mode = 1;
    this.beneficiary={
      id:0,
      id_customer:0,
      id_owner:0,
      relationship_account_owner:"",
      start_date:"",
      end_date:""
    }
  }
  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({
      id: [null, []],
      id_customer:[0,[Validators.required,Validators.min(1),Validators.max(100)]],
      id_owner:[0,[Validators.required, Validators.min(1),Validators.max(100)]],
      relationship_account_owner:['',[Validators.required]],
      start_date:["",[Validators.required,Validators.pattern(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/) ]],
      end_date:['',[Validators.required,Validators.pattern(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/) ]]
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
      this.beneficiary.id=this.activateRoute.snapshot.params.id
      this.getTheater(this.beneficiary.id)
    }
  }
  getTheater(id:number){
    this.service.view(id).subscribe(data=>{
      this.beneficiary=data
      console.log("Beneficiary->"+JSON.stringify(this.beneficiary))
    })
    
  }
  create(){
    if (this.theFormGroup.invalid) {
      this.trySend=true
      Swal.fire("Error en el formulario","Ingrese correctamente los datos solicitados","error")
      return
    }
    this.service.create(this.beneficiary).subscribe(data=>{
      Swal.fire("Creación Exitosa","Se ha creado un nuevo registro","success")
      this.router.navigate(["beneficiaries/list"])
    })
  }
  update(){
    if (this.theFormGroup.invalid) {
      this.trySend=true
      Swal.fire("Error en el formulario","Ingrese correctamente los datos solicitados","error")
      return
    }
    this.service.update(this.beneficiary).subscribe(data=>{
      Swal.fire("Actualización Exitosa","Se ha actualizado el registro","success")
      this.router.navigate(["beneficiaries/list"])
    })
  }

}
