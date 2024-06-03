import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from 'src/app/models/service.model';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  services: Service []
  constructor(private service:ServiceService, private router:Router) { 
    this.services = []
  }

  ngOnInit(): void {
    this.list();
  }
  list(){
    this.service.list().subscribe( data =>{
      this.services = data
      console.log(JSON.stringify(this.services));
    })
  }
  create(){
    this.router.navigate(['service_executions/create/'])
  }

  view(id:number){
    this.router.navigate(['service_executions/view/'+id])
  }

  update(id:number){
    this.router.navigate(['service_executions/update/'+id])
  }
  delete(id: number){
    Swal.fire({
      title: 'Eliminar el servicio',
      text: "Está seguro que quiere eliminar el servicio ",
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
      'El servicio ha sido eliminado correctamente',
      'success'
      )
      this.ngOnInit();
      });
      }
      })
    };

}
