import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'src/app/models/subscription.model';
import { SubscriptionService } from 'src/app/services/subscription.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  subscriptions: Subscription []
  constructor( private service:SubscriptionService, private router:Router) { 
    this.subscriptions = []
  }

  ngOnInit(): void {
    this.list()
  }

  list () {
    this.service.list().subscribe( data =>{
      this.subscriptions = data
      console.log(JSON.stringify(this.subscriptions));
      
    })
  }

  create(){
    this.router.navigate(['subscriptions/create/'])
  }

  view(id:number){
    this.router.navigate(['subscriptions/view/'+id])
  }

  update(id:number){
    this.router.navigate(['subscriptions/update/'+id])
  }

  delete(id: number){
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
