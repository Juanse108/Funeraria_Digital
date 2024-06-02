import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/role.model';
import { RoleService } from 'src/app/services/role.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  
  roles: Role []
  constructor( private service:RoleService, private router:Router) { 
    this.roles = []
  }

  ngOnInit(): void {
    this.list()
  }

  list () {
    this.service.list().subscribe( data =>{
      this.roles = data
      console.log(JSON.stringify(this.roles));
      
    })
  }

  create(){
    this.router.navigate(['roles/create/'])
  }

  view(id:number){
    this.router.navigate(['roles/view/'+id])
  }

  update(id:number){
    this.router.navigate(['roles/update/'+id])
  }

  delete(id: string){
    Swal.fire({
      title: 'Eliminar rol',
      text: "Está seguro que quiere eliminar el rol?",
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
      'El rol ha sido eliminada correctamente',
      'success'
      )
      this.ngOnInit();
      });
      }
      })
    };

}
