import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Site } from 'src/app/models/site.model';
import { SiteService } from 'src/app/services/site.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  sites: Site []
  constructor(private service:SiteService, private router:Router) {
    this.sites = []
   }

   ngOnInit(): void {
    this.list();
  }
  list(){
    this.service.list().subscribe( data =>{
      this.sites = data
      console.log(JSON.stringify(this.sites));
    })
  }
  create(){
    this.router.navigate(['messages/create/'])
  }

  view(id:number){
    this.router.navigate(['messages/view/'+id])
  }

  update(id:number){
    this.router.navigate(['messages/update/'+id])
  }
  delete(id: number){
    Swal.fire({
      title: 'Eliminar la sede',
      text: "Está seguro que quiere eliminar la sede ",
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
      'La sede ha sido eliminado correctamente',
      'success'
      )
      this.ngOnInit();
      });
      }
      })
    };

}
