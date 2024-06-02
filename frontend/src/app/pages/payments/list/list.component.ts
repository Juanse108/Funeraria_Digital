import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Payment } from 'src/app/models/payment.model';
import { PaymentService } from 'src/app/services/payment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  payments: Payment []
  constructor( private service:PaymentService, private router:Router) { 
    this.payments = []
  }

  ngOnInit(): void {
    this.list()
  }

  list () {
    this.service.list().subscribe( data =>{
      this.payments = data
      console.log(JSON.stringify(this.payments));
      
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

