import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Permission } from 'src/app/models/permission.model';
import { RolePermission } from 'src/app/models/role-permission.model';
import { PermissionService } from 'src/app/services/permission.service';
import { RolePermissionService } from 'src/app/services/role-permission.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  
  role_permissions: RolePermission []
  constructor( private service:RolePermissionService, private router:Router) { 
    this.role_permissions = []
  }

  ngOnInit(): void {
    this.list()
  }

  list () {
    this.service.list().subscribe( data =>{
      this.role_permissions = data
      console.log(JSON.stringify(this.role_permissions));
      
    })
  }

  create(){
    this.router.navigate(['role_permissions/create/'])
  }

  view(id:number){
    this.router.navigate(['role_permissions/view/'+id])
  }

  update(id:number){
    this.router.navigate(['role_permissions/update/'+id])
  }

  delete(id: string){
    Swal.fire({
      title: 'Eliminar rol y permiso',
      text: "Está seguro que quiere eliminar el rol y permiso?",
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
