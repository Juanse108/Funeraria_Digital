import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Room } from 'src/app/models/room.model';
import { RoomService } from 'src/app/services/room.service';
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
  room:Room
  sites:Site[]
  constructor(private activateRoute: ActivatedRoute,
              private service:RoomService,
              private siteService:SiteService,
              private router:Router
            , private theFormBuilder:FormBuilder
          ) {
    this.trySend=false
    this.mode = 1;
    this.sites=[]
    this.room={
      id_room:0,
      capacity:0,
      chairs_number:0,
      id_site_mortuary:0
    }
  }
  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({
      id_room: [null, []],
      capacity:[0,[Validators.required, Validators.min(1),Validators.max(100)]],
      chairs_number:[0,[Validators.required, Validators.min(1),Validators.max(50)]],
      id_site_mortuary:[0,[Validators.required ]]
    })
  }
  sitesList() {
    this.siteService.list().subscribe(data => {
      this.sites = data
    })
  }

  get getTheFormGroup(){
    return this.theFormGroup.controls
  }

  ngOnInit(): void {
    this.sitesList()
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
      this.room.id_room=this.activateRoute.snapshot.params.id
      this.getTheater(this.room.id_room)
    }
  }
  getTheater(id:number){
    this.service.view(id).subscribe(data=>{
      this.room=data
      console.log("Room->"+JSON.stringify(this.room))
    })
    
  }
  create(){
    if (this.theFormGroup.invalid) {
      this.trySend=true
      Swal.fire("Error en el formulario","Ingrese correctamente los datos solicitados","error")
      return
    }
    this.service.create(this.room).subscribe(data=>{
      Swal.fire("Creación Exitosa","Se ha creado un nuevo registro","success")
      this.router.navigate(["rooms/list"])
    })
  }
  update(){
    if (this.theFormGroup.invalid) {
      this.trySend=true
      Swal.fire("Error en el formulario","Ingrese correctamente los datos solicitados","error")
      return
    }
    this.service.update(this.room).subscribe(data=>{
      Swal.fire("Actualización Exitosa","Se ha actualizado el registro","success")
      this.router.navigate(["rooms/list"])
    })
  }
}
