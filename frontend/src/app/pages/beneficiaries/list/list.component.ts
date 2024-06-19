import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Beneficiary } from 'src/app/models/beneficiary.model';
import { BeneficiaryService } from 'src/app/services/beneficiary.service';
import { CustomerService } from 'src/app/services/customer.service';
import { OwnerService } from 'src/app/services/owner.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  beneficiaries: Beneficiary[];
  beneficiaryAux: Beneficiary[];
  owner: number;

  constructor(private service:BeneficiaryService, 
              private router:Router, 
              private route: ActivatedRoute,
              private ownerService: OwnerService,
              private customerService: CustomerService,
              private userService: UserService
            ) {
    this.beneficiaries = [];
   }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      let ownerId = params['ownerId'];
      this.list(ownerId);
    })
  }

  list(ownerId:number){
    this.ownerService.view(ownerId).subscribe(data=>{
      this.owner = ownerId;
      this.beneficiaries = data["beneficiaries"];
      this.beneficiaryAux = [];
  
      for(let beneficiary of this.beneficiaries){
        this.service.view(beneficiary.id).subscribe(beneficiaryData => {
          this.beneficiaryAux.push(beneficiaryData);
        })
      }
  
      console.log(JSON.stringify(this.beneficiaries));
    });
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
