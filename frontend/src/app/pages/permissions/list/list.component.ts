import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Permission } from 'src/app/models/permission.model';
import { PermissionService } from 'src/app/services/permission.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  
  permissions: Permission []
  constructor( private service:PermissionService, private router:Router) { 
    this.permissions = []
  }

  ngOnInit(): void {
    this.list()
  }

  list () {
    this.service.list().subscribe( data =>{
      this.permissions = data
      console.log(JSON.stringify(this.permissions));
      
    })
  }

  create(){
    this.router.navigate(['permissions/create/'])
  }

  view(id:number){
    this.router.navigate(['permissions/view/'+id])
  }

  update(id:number){
    this.router.navigate(['permissions/update/'+id])
  }

  delete(id: string){
    Swal.fire({
      title: 'Eliminar permiso',
      text: "Está seguro que quiere eliminar el permiso?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, Cancelar'
      }).then((result) => {
      if (result.isConfirmed) {
      this.service.delete(id).
      subscribe(data => {
      Swal.fire(
      'Eliminado!',
      'El permiso ha sido eliminada correctamente',
      'success'
      )
      this.ngOnInit();
      });
      }
      })
    };

}
