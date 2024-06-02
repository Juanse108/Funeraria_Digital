import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  customers: Customer []
  constructor( private service:CustomerService, private router:Router) { 
    this.customers = []
  }

  ngOnInit(): void {
    this.list()
  }

  list () {
    this.service.list().subscribe( data =>{
      this.customers = data
      console.log(JSON.stringify(this.customers));
      
    })
  }

  create(){
    this.router.navigate(['customers/create/'])
  }

  view(id:number){
    this.router.navigate(['customers/view/'+id])
  }

  update(id:number){
    this.router.navigate(['customers/update/'+id])
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

