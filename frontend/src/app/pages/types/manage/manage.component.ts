import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Type } from 'src/app/models/type.model';
import { TypeService } from 'src/app/services/type.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  types: Type []
  constructor( private service:TypeService, private router:Router) { 
    this.types = []
  }

  ngOnInit(): void {
    this.list()
  }

  list () {
    this.service.list().subscribe( data =>{
      this.types = data
      console.log(JSON.stringify(this.types));
      
    })
  }

  create(){
    this.router.navigate(['types/create/'])
  }

  view(id:string){
    this.router.navigate(['types/view/'+id])
  }

  update(id:string){
    this.router.navigate(['types/update/'+id])
  }

  delete(id: string){
    Swal.fire({
      title: 'Eliminar Tipo de música',
      text: "Está seguro que quiere eliminar el tipo de música?",
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
      'El tipo de música ha sido eliminada correctamente',
      'success'
      )
      this.ngOnInit();
      });
      }
      })
    };

}
