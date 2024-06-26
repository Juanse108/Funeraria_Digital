import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { Plan } from 'src/app/models/plan.model';
import { Subscription } from 'src/app/models/subscription.model';
import { PlanService } from 'src/app/services/plan.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import Swal from 'sweetalert2';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number
  subscription: Subscription
  theFormGroup: FormGroup
  trySend: boolean
  plans: Plan []
  customers: Customer []
  constructor(private activateRoute: ActivatedRoute,
    private service: SubscriptionService,
    private planService: PlanService,
    private customerService: CustomerService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.plans = []
    this.customers = []
    this.mode = 1;
    this.subscription = { subscription_id: 0, id_plan: 0, id_customer: 0, start_date: "", end_date: "" }
  }

  ngOnInit(): void {
    this.customersList()
    this.plansList()
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
      this.subscription.subscription_id = this.activateRoute.snapshot.params.id;
      this.getSuscription(this.subscription.subscription_id);
    }
  }
  getSuscription(id: number) {
    this.service.view(id).subscribe(data => {
      this.subscription = data
    })
  }

  customersList() {
    this.customerService.list().subscribe(data => {
      this.customers = data
    })
  }

  plansList() {
    this.planService.list().subscribe(data => {
      this.plans = data
    })
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      id: [],
      id_plan: ['', [
        Validators.required
      ]],
      id_customer: ['', [
        Validators.required
      ]],
      start_date: ['', [
        Validators.required,
        Validators.pattern(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/) // Valida el formato de fecha yyyy-MM-dd HH:mm:ss
      ]],
      end_date: ['', [
        Validators.required,
        Validators.pattern(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/) // Valida el formato de fecha yyyy-MM-dd HH:mm:ss
      ]]
    });
  }

  get getSubscriptionFormGroup() {
    return this.theFormGroup.controls
  }

  create() {
    this.trySend = true
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    } else {
      this.service.create(this.subscription).subscribe(data => {
        Swal.fire('Completado', 'Se ha creado Correctamente', 'success')
        this.router.navigate(['subscriptions/list'])
      })
    }
  }

  update() {
    this.trySend = true
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    } else {
      this.service.update(this.subscription).subscribe(data => {
        Swal.fire('Completado', 'Se ha creado Correctamente', 'success')
        this.router.navigate(['subscriptions/list'])
      })
    }
  }
}
