import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceExecution } from 'src/app/models/service-execution.model';
import { CustomerService } from 'src/app/services/customer.service';
import { ServiceExecutionService } from 'src/app/services/service-execution.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  service_executions: ServiceExecution []
  service_executions_aux: ServiceExecution []
  customer: number
  constructor(
    private serviceExecutionService: ServiceExecutionService, 
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerService,
  ) { 
    this.service_executions = []
  }

  ngOnInit(): void {
    this.listServiceExecutions()
  }

  listServiceExecutions() {
    this.route.queryParams.subscribe(params =>{
      this.customer = params['customerId'];
      if (this.customer != null) {
        this.customerService.view(this.customer).subscribe(data=>{
          this.service_executions = data["service_executions"];
          console.log(JSON.stringify(this.service_executions));
        });
      } else {
        this.serviceExecutionService.list().subscribe(data => {
          this.service_executions = data
        })
      }
    })
  }

  create(){
    this.router.navigate(['service_executions/create/'])
  }

  view(id:number){
    this.router.navigate(['service_executions/view/'+id])
  }

  listComments(id:number){
    this.router.navigate(["comment_ratings/list/"], { queryParams: { service_code: id } })
  }

  listChats(id:number){
    this.router.navigate(["chats/list/"], { queryParams: { service_code: id } })
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
      this.serviceExecutionService.delete(id).
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
