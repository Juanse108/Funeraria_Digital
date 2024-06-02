import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Relocation } from 'src/app/models/relocation.model';
import { RelocationService } from 'src/app/services/relocation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  relocations: Relocation []
  constructor( private service:RelocationService, private router:Router) { 
    this.relocations = []
  }

  ngOnInit(): void {
    this.list()
  }

  list () {
    this.service.list().subscribe( data =>{
      this.relocations = data
      console.log(JSON.stringify(this.relocations));
      
    })
  }

  create(){
    this.router.navigate(['relocations/create/'])
  }

  view(id:number){
    this.router.navigate(['relocations/view/'+id])
  }

  update(id:number){
    this.router.navigate(['relocations/update/'+id])
  }

  delete(id_relocation: number){
    
    Swal.fire({
      title: 'Eliminar el traslado',
      text: "Está seguro que quiere eliminar el traslado ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, Cancelar'
      }).then((result) => {
      if (result.isConfirmed) {
      this.service.delete(id_relocation).
      subscribe(data => {
      Swal.fire(
      'Eliminado!',
      'El traslado ha sido eliminado correctamente',
      'success'
      )
      this.ngOnInit();
      });
      }
      })
    };

}
