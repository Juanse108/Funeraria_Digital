import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Beneficiary } from 'src/app/models/beneficiary.model';
import { BeneficiaryService } from 'src/app/services/beneficiary.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  beneficiaries: Beneficiary []
  constructor( private service:BeneficiaryService, private router:Router) { 
    this.beneficiaries = []
  }

  ngOnInit(): void {
    this.list();
  }
  list(){
    this.service.list().subscribe( data =>{
      this.beneficiaries = data
      console.log(JSON.stringify(this.beneficiaries));
    })
  }
  create(){
    this.router.navigate(['beneficiaries/create/'])
  }

  view(id:number){
    this.router.navigate(['beneficiaries/view/'+id])
  }

  update(id:number){
    this.router.navigate(['beneficiaries/update/'+id])
  }
  delete(id: number){
    Swal.fire({
      title: 'Eliminar el beneficiario',
      text: "Está seguro que quiere eliminar el beneficiario ",
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
      'El beneficiario ha sido eliminado correctamente',
      'success'
      )
      this.ngOnInit();
      });
      }
      })
    };

}
