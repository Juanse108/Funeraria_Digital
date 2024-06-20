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
  selectedPlan: Plan
  customer: Customer

  handler: any
  data: any

  constructor(
    private theSecurityService: SecurityService,
    private theUserService: UserService,
  ) {
    this.selectedPlan = {
      name: "Default Name",
      description: "Default Description",
      price: 5000,
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

  ngOnInit(): void {}

  popup() {
    this.handler = (window as any).ePayco.checkout.configure({
      key: environment.EPAYCO_PUBLIC_KEY,
      test: true
    });

    this.data = {
      // Parámetros de compra (obligatorio)
      name: this.selectedPlan.name,
      description: this.selectedPlan.description,
      invoice: `FAC-${this.selectedPlan.id_plan}`,
      currency: "cop",
      amount: this.selectedPlan.price,
      tax_base: "0",
      tax: "0",
      tax_ico: "0",
      country: "co",
      lang: "es",

      // So it opens a new window
      external: "false",

      // Atributos opcionales
      confirmation: environment.EPAYCO_CONFIRMATION_URL,
      response: environment.EPAYCO_RESPONSE_URL,
      number_beneficiaries: this.selectedPlan.number_beneficiaries,

      // Atributos cliente (También opcionales)
      //name_billing: this.customer.user.name,
      //email_billing: this.customer.user.email,
      /*
      type_doc_billing: "cc",
      number_doc_billing: "undefined",
      mobilephone_billing: "undefined",
      address_billing: "undefined",
      */

      //atributo deshabilitación método de pago
      //methodsDisable: ["TDC", "PSE","SP","CASH","DP"]
    }
    this.handler.open(this.data)
  }
}
