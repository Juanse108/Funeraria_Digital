import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Payment } from 'src/app/models/payment.model';
import { PaymentService } from 'src/app/services/payment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number
  payment: Payment
  theFormGroup: FormGroup
  trySend: boolean
  constructor(private activateRoute: ActivatedRoute,
    private service: PaymentService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.mode = 1;
    this.payment = { id: 0, payment_date: "", quantity: 0, payment_type: "", discount: 0, subscription_id: 0 }
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
      this.payment.id = this.activateRoute.snapshot.params.id;
      this.getEjecution(this.payment.id);
    }
  }
  getEjecution(id: number) {
    this.service.view(id).subscribe(data => {
      this.payment = data
    })
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      payment_date: ['', [
        Validators.required,
        Validators.pattern(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/) // Valida el formato de fecha yyyy-MM-dd HH:mm:ss
      ]],
      quantity: ['', [
        Validators.required, Validators.min(0), Validators.max(100000)
      ]],
      payment_type: ['',[Validators.required]],
      discount: ['', [
        Validators.required, Validators.min(0), Validators.max(100)
      ]],
      subscription_id: ['', [
        Validators.required, Validators.min(1), Validators.max(100)
      ]],
    });
  }

  get getFormGroup() {
    return this.theFormGroup.controls
  }

  create() {
    this.trySend = true
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    } else {
      this.service.create(this.payment).subscribe(data => {        
        Swal.fire('Completado', 'Se ha creado Correctamente', 'success')
        this.router.navigate(['payments/list'])
      })
    }
  }

  update() {
    this.trySend = true
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    } else {
      this.service.update(this.payment).subscribe(data => {
        Swal.fire('Completado', 'Se ha creado Correctamente', 'success')
        this.router.navigate(['payments/list'])
      })
    }
  }
}
