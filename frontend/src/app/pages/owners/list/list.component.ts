import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Owner } from 'src/app/models/owner.model';
import { OwnerService } from 'src/app/services/owner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  owners: Owner []
  constructor(private service:OwnerService, private router:Router) {
    this.owners = []
   }

  ngOnInit(): void {
    this.list();
  }
  list(){
    this.service.list().subscribe( data =>{
      this.owners = data
      console.log(JSON.stringify(this.owners));
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
      title: 'Eliminar el titular',
      text: "Está seguro que quiere eliminar el titular ",
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
      'El titular ha sido eliminado correctamente',
      'success'
      )
      this.ngOnInit();
      });
      }
      })
    };
}
