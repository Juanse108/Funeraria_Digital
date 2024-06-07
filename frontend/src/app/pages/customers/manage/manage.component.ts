import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Beneficiary } from 'src/app/models/beneficiary.model';
import { Customer } from 'src/app/models/customer.model';
import { Owner } from 'src/app/models/owner.model';
import { ServiceExecution } from 'src/app/models/service-execution.model';
import { BeneficiaryService } from 'src/app/services/beneficiary.service';
import { CustomerService } from 'src/app/services/customer.service';
import { OwnerService } from 'src/app/services/owner.service';
import { ServiceExecutionService } from 'src/app/services/service-execution.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number
  customer: Customer
  theFormGroup: FormGroup
  trySend: boolean
  service_executions: ServiceExecution []
  beneficiaries: Beneficiary []
  owners: Owner []
  subscriptions: Subscription []
  constructor(private activateRoute: ActivatedRoute,
    private service: CustomerService,
    private router: Router,
    private theFormBuilder: FormBuilder,
  ) {
    this.service_executions =[]
    this.beneficiaries = []
    this.owners = []
    this.subscriptions =[]
    this.trySend = false
    this.mode = 1;
    this.customer = { id_customer: 0, user_id: "", registration_date: "", status: ""
     }
  }

  ngOnInit(): void {
    this.configFormGroup()
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.customer.id_customer = this.activateRoute.snapshot.params.id;
      this.getCustomer(this.customer.id_customer);
    }
  }
  getCustomer(id: number) {
    this.service.view(id).subscribe(data => {
      this.customer = data
    })
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      user_id: ['', [
        Validators.required,
        Validators.minLength(24),
        Validators.maxLength(24),
        Validators.pattern(/^[a-zA-Z0-9]*$/)
      ]],
      status: ['', [
        Validators.required,
        Validators.pattern(/^(vivo|muerto)$/)
      ]],
      registration_date: ['', [
        Validators.required,
        Validators.pattern(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)
      ]],
    });
  }

  get getUserFormGroup() {
    return this.theFormGroup.controls;
  }

  create() {
    this.trySend = true
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    } else {
      this.service.create(this.customer).subscribe(data => {
        Swal.fire('Completado', 'Se ha creado Correctamente', 'success')
        this.router.navigate(['customers/list'])
      })
    }
  }

  update() {
    this.trySend = true
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    } else {
      this.service.update(this.customer).subscribe(data => {
        Swal.fire('Completado', 'Se ha creado Correctamente', 'success')
        this.router.navigate(['customers/list'])
      })
    }
  }
}
