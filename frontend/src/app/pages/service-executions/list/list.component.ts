import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceExecution } from 'src/app/models/service-execution.model';
import { ServiceExecutionService } from 'src/app/services/service-execution.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  service_executions: ServiceExecution []
  constructor( private service:ServiceExecutionService, private router:Router) { 
    this.service_executions = []
  }

  ngOnInit(): void {
    this.list()
  }

  list () {
    this.service.list().subscribe( data =>{
      this.service_executions = data
      console.log(JSON.stringify(this.service_executions));
      
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
      title: 'Eliminar la ejecucion de servicio',
      text: "Está seguro que quiere eliminar la ejecucion de servicio?",
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
      'La ejecucion de servicio ha sido eliminada correctamente',
      'success'
      )
      this.ngOnInit();
      });
      }
      })
    };

}
