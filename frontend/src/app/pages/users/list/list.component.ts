import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  users: User []
  constructor( private service:UserService, private router:Router) { 
    this.users = []
  }

  ngOnInit(): void {
    this.list()
  }

  list () {
    this.service.list().subscribe( data =>{
      this.users = data
      console.log(JSON.stringify(this.users));
      
    })
  }

  create(){
    this.router.navigate(['users/create/'])
  }

  view(id:string){
    this.router.navigate(['users/view/'+id])
  }

  update(id:string){
    this.router.navigate(['users/update/'+id])
  }

  delete(id: string){
    Swal.fire({
      title: 'Eliminar Usuario',
      text: "Está seguro que quiere eliminar el usuario?",
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
      'El usuario ha sido eliminada correctamente',
      'success'
      )
      this.ngOnInit();
      });
      }
      })
    };

}
