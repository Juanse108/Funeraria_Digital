import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Payment } from 'src/app/models/payment.model';
import { PaymentService } from 'src/app/services/payment.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  payments: Payment []
  payments_aux: Payment []
  subscription: number
  constructor( private service:PaymentService, 
    private router:Router,
    private route: ActivatedRoute,
     private subscriptionService: SubscriptionService,
  ) { 
    this.payments = []
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      let subscriptionId = params['subscriptionId'];
      this.list(subscriptionId);
    })
  }

  list (subscriptionId:number) {
    this.subscriptionService.view(subscriptionId).subscribe(data=>{
      this.subscription = subscriptionId;
      this.payments = data["payments"];
      this.payments_aux = [];
  
      for(let payment of this.payments){
        this.service.view(payment.id).subscribe(data => {
          this.payments_aux.push(data);
        })
      }
  
      console.log(JSON.stringify(this.payments));
    });
  }

  create(){
    this.router.navigate(['payments/create/'])
  }

  view(id:number){
    this.router.navigate(['payments/view/'+id])
  }

  update(id:number){
    this.router.navigate(['payments/update/'+id])
  }

  delete(id: number){
    Swal.fire({
      title: 'Eliminar el pago',
      text: "Está seguro que quiere eliminar el pago",
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
      'El pago ha sido eliminado correctamente',
      'success'
      )
      this.ngOnInit();
      });
      }
      })
    };

}

