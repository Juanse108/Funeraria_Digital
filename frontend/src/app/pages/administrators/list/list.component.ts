import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Administrator } from 'src/app/models/administrator.model';
import { AdministratorService } from 'src/app/services/administrator.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  administrators: Administrator [] 
  constructor( private service:AdministratorService, private router:Router) { 
    this.administrators = []
  }

  ngOnInit(): void {
    this.list();
  }
  list(){
    this.service.list().subscribe( data =>{
      this.administrators = data
      console.log(JSON.stringify(this.administrators));
    })
  }
  create(){
    this.router.navigate(['administrators/create/'])
  }

  view(id:number){
    this.router.navigate(['administrators/view/'+id])
  }

  update(id:number){
    this.router.navigate(['administrators/update/'+id])
  }
  delete(id: number){
    Swal.fire({
      title: 'Eliminar el administrador',
      text: "Está seguro que quiere eliminar el administrador ",
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
      'El adminisitrador ha sido eliminado correctamente',
      'success'
      )
      this.ngOnInit();
      });
      }
      })
    };

}
