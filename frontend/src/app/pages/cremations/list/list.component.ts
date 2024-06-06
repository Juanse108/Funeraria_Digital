import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cremation } from 'src/app/models/cremation.model';
import { CremationService } from 'src/app/services/cremation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  cremations: Cremation []
  constructor( private service:CremationService, private router:Router) { 
    this.cremations = []
  }

  ngOnInit(): void {
    this.list();
  }
  list(){
    this.service.list().subscribe( data =>{
      this.cremations = data
      console.log(JSON.stringify(this.cremations));
    })
  }
  create(){
    this.router.navigate(['cremations/create/'])
  }

  view(id:number){
    this.router.navigate(['cremations/view/'+id])
  }

  update(id:number){
    this.router.navigate(['cremations/update/'+id])
  }
  delete(id: number){
    Swal.fire({
      title: 'Eliminar la cremacion',
      text: "Está seguro que quiere eliminar el cremacion ",
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
      'La cremacion ha sido eliminado correctamente',
      'success'
      )
      this.ngOnInit();
      });
      }
      })
    };

}
