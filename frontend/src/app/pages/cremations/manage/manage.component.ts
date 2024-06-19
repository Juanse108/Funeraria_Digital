import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cremation } from 'src/app/models/cremation.model';
import { CremationService } from 'src/app/services/cremation.service';
import { Room } from 'src/app/models/room.model';
import { RoomService } from 'src/app/services/room.service';
import { Service } from 'src/app/models/service.model';
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
  cremation:Cremation
  rooms:Room[]
  services:Service[]
  
  constructor(private activateRoute: ActivatedRoute,
              private service:CremationService,
              private roomService:RoomService,
              private serviceService:ServiceService,
            private router:Router
            ,private theFormBuilder:FormBuilder
          ) {
    this.trySend=false
    this.mode = 1;
    this.rooms=[]
    this.services=[]
    this.cremation={
      id_cremation:0,
      destination_ashes:"",
      urn_type:"",
      id_service:0,
      id_room:0,
    }
  }
  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({
      id_cremation: [null, []],
      destination_ashes:["",[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      urn_type:["",[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      id_service:[0,[Validators.required]],
      id_room:[0,[Validators.required]]
    })
  }
  get getTheFormGroup(){
    return this.theFormGroup.controls
  }
  servicesList() {
    this.serviceService.list().subscribe(data => {
      this.services = data
    })
  }

  roomsList() {
    this.roomService.list().subscribe(data => {
      this.rooms = data
    })
  }
  ngOnInit(): void {
    this.servicesList()
    this.roomsList()
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
      this.cremation.id_cremation=this.activateRoute.snapshot.params.id
      this.getTheater(this.cremation.id_cremation)
    }
  }
  getTheater(id:number){
    this.service.view(id).subscribe(data=>{
      this.cremation=data
      console.log("Cremation->"+JSON.stringify(this.cremation))
    })
    
  }
  create(){
    if (this.theFormGroup.invalid) {
      this.trySend=true
      Swal.fire("Error en el formulario","Ingrese correctamente los datos solicitados","error")
      return
    }
    this.service.create(this.cremation).subscribe(data=>{
      Swal.fire("Creación Exitosa","Se ha creado un nuevo registro","success")
      this.router.navigate(["cremations/list"])
    })
  }
  update(){
    if (this.theFormGroup.invalid) {
      this.trySend=true
      Swal.fire("Error en el formulario","Ingrese correctamente los datos solicitados","error")
      return
    }
    this.service.update(this.cremation).subscribe(data=>{
      Swal.fire("Actualización Exitosa","Se ha actualizado el registro","success")
      this.router.navigate(["cremations/list"])
    })
  }

}
