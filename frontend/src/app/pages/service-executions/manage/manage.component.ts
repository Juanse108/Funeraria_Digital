import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceExecution } from 'src/app/models/service-execution.model';
import { ServiceExecutionService } from 'src/app/services/service-execution.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number
  service_execution: ServiceExecution
  theFormGroup: FormGroup
  trySend: boolean
  constructor(private activateRoute: ActivatedRoute,
    private service: ServiceExecutionService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.mode = 1;
    this.service_execution = { service_code: 0, id_service: 0, id_customer: 0, deceased_location: "", start_date: "", end_date: "" }
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
      this.service_execution.service_code = this.activateRoute.snapshot.params.id;
      this.getEjecution(this.service_execution.service_code);
    }
  }
  getEjecution(id: number) {
    this.service.view(id).subscribe(data => {
      this.service_execution = data
    })
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      id_service: ['', [
        Validators.required, Validators.min(1), Validators.max(100)
      ]],
      id_customer: ['', [
        Validators.required, Validators.min(1), Validators.max(100)
      ]],
      deceased_location: ['',[Validators.required]],
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

  get getFormGroup() {
    return this.theFormGroup.controls
  }

  create() {
    this.trySend = true
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    } else {
      this.service.create(this.service_execution).subscribe(data => {        
        Swal.fire('Completado', 'Se ha creado Correctamente', 'success')
        this.router.navigate(['service_executions/list'])
      })
    }
  }

  update() {
    this.trySend = true
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    } else {
      this.service.update(this.service_execution).subscribe(data => {
        Swal.fire('Completado', 'Se ha creado Correctamente', 'success')
        this.router.navigate(['service_executions/list'])
      })
    }
  }
}
