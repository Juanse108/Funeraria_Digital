import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Burial } from 'src/app/models/burial.model';
import { BurialService } from 'src/app/services/burial.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  burials: Burial []
  constructor( private service:BurialService, private router:Router) { 
    this.burials = []
  }

  ngOnInit(): void {
    this.list();
  }
  list(){
    this.service.list().subscribe( data =>{
      this.burials = data
      console.log(JSON.stringify(this.burials));
    })
  }
  create(){
    this.router.navigate(['burials/create/'])
  }

  view(id:number){
    this.router.navigate(['burials/view/'+id])
  }

  update(id:number){
    this.router.navigate(['burials/update/'+id])
  }
  delete(id: number){
    Swal.fire({
      title: 'Eliminar la sepultura',
      text: "Está seguro que quiere eliminar la sepultura ",
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
      'La sepultura ha sido eliminado correctamente',
      'success'
      )
      this.ngOnInit();
      });
      }
      })
    };

}
