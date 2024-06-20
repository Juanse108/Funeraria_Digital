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
    private paymentService: PaymentService,
  ) {
    this.payments = []
  }

  ngOnInit(): void {
    this.listPayments()
  }

  listPayments() {
    this.route.queryParams.subscribe(params =>{
      this.subscription = params['subscriptionId'];
      if (this.subscription != null) {
        this.subscriptionService.view(this.subscription).subscribe(data=>{
          this.payments = data["payments"];
          this.payments_aux = [];    
          console.log(JSON.stringify(this.payments));
        });
      } else {
        this.paymentService.list().subscribe(data => {
          this.payments = data
        })
      }
    })
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

