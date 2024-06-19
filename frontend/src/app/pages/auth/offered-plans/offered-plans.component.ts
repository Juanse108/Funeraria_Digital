import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { Plan } from 'src/app/models/plan.model';
import { User } from 'src/app/models/user.model';
import { SecurityService } from 'src/app/services/security.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-offered-plans',
  templateUrl: './offered-plans.component.html',
  styleUrls: ['./offered-plans.component.scss']
})
export class OfferedPlansComponent implements OnInit {
  checkoutUrl: string
  responseUrl: string
  confirmationUrl: string
  publicKey: string
  privateKey: string

  selectedPlan: Plan
  customer: Customer

  constructor(
    private theSecurityService: SecurityService,
    private theUserService: UserService,
  ) {
    this.checkoutUrl = environment.NEXT_PUBLIC_EPAYCO_CHECKOUT_URL
    this.responseUrl = environment.NEXT_PUBLIC_EPAYCO_RESPONSE_URL
    this.confirmationUrl = environment.NEXT_PUBLIC_EPAYCO_CONFIRMATION_URL
    this.publicKey = environment.NEXT_PUBLIC_EPAYCO_KEY
    this.privateKey = environment.NEXT_PUBLIC_EPAYCO_PRIVATE_KEY
    this.selectedPlan = {
      name: "",
      description: "",
      price: 0,
      number_beneficiaries: 0,
    }
    if (theSecurityService.existSession()) {
      this.theSecurityService.getUser().subscribe(data => {
        this.customer = {
          user: data
        }
      })
    }
  }

  ngOnInit(): void {
  }
}
