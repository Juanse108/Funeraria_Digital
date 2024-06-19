import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'src/app/models/subscription.model';
import { CustomerService } from 'src/app/services/customer.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  subscriptions: Subscription[]
  subscriptions_aux: Subscription[]
  customer: number

  constructor(private service: SubscriptionService,
     private router: Router, 
     private route: ActivatedRoute,
     private customerService: CustomerService,
  ) {
    this.subscriptions = []
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      let customerId = params['customerId'];
      this.list(customerId);
    })
  }

  list (customerId:number) {
    this.customerService.view(customerId).subscribe(data=>{
      this.customer = customerId;
      this.subscriptions = data["subscriptions"];
      this.subscriptions_aux = [];
  
      for(let Subscription of this.subscriptions){
        this.service.view(Subscription.subscription_id).subscribe(data => {
          this.subscriptions_aux.push(data);
        })
      }
  
      console.log(JSON.stringify(this.subscriptions));
    });
  }

  create() {
    this.router.navigate(['subscriptions/create/'])
  }

  view(id: number) {
    this.router.navigate(['subscriptions/view/' + id])
  }

  update(id: number) {
    this.router.navigate(['subscriptions/update/' + id])
  }

  listPayments(id:number){
    this.router.navigate(["payments/list/"], { queryParams: { subscriptionId: id } })
  }

  delete(id: number) {
    Swal.fire({
      title: 'Eliminar cliente',
      text: "Está seguro que quiere eliminar el cliente?",
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
              'El cliente ha sido eliminada correctamente',
              'success'
            )
            this.ngOnInit();
          });
      }
    })
  };

}
