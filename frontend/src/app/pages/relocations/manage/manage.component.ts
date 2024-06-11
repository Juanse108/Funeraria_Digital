import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Driver } from 'src/app/models/driver.model';
import { Relocation } from 'src/app/models/relocation.model';
import { Service } from 'src/app/models/service.model';
import { DriverService } from 'src/app/services/driver.service';
import { RelocationService } from 'src/app/services/relocation.service';
import { ServiceService } from 'src/app/services/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number
  relocation: Relocation
  theFormGroup: FormGroup
  trySend: boolean
  services: Service[]
  drivers: Driver[]
  constructor(private activateRoute: ActivatedRoute,
    private service: RelocationService,
    private servicesService : ServiceService,
    private driverService: DriverService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.drivers = []
    this.services = []
    this.mode = 1;
    this.relocation = { id_relocation: 0, id_service: 0, id_driver: 0, departure_date: "", finish_date: "", origin: "", destiny: "" }
  }

  ngOnInit(): void {
    this.servicesList()
    this.driversList()
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
      this.relocation.id_relocation = this.activateRoute.snapshot.params.id;
      this.getEjecution(this.relocation.id_relocation);
    }
  }
  getEjecution(id: number) {
    this.service.view(id).subscribe(data => {
      this.relocation = data
    })
  }

  servicesList() {
    this.servicesService.list().subscribe(data => {
      this.services = data
    })
  }

  driversList() {
    this.driverService.list().subscribe(data => {
      this.drivers = data
    })
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      id: [],
      id_service: ['', [
        Validators.required
      ]], // Validación asíncrona si es necesario
      id_driver: ['', [
        Validators.required
      ]], // Validación asíncrona si es necesario
      departure_date: ['', [
        Validators.required,
        Validators.pattern(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)
      ]],
      finish_date: ['', [
        Validators.required,
        Validators.pattern(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)
      ]],
      origin: ['', [
        Validators.required,
        Validators.maxLength(20)
      ]],
      destiny: ['', [
        Validators.required,
        Validators.maxLength(20)
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
      this.service.create(this.relocation).subscribe(data => {
        Swal.fire('Completado', 'Se ha creado Correctamente', 'success')
        this.router.navigate(['relocations/list'])
      })
    }
  }

  update() {
    this.trySend = true
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    } else {
      this.service.update(this.relocation).subscribe(data => {
        Swal.fire('Completado', 'Se ha creado Correctamente', 'success')
        this.router.navigate(['relocations/list'])
      })
    }
  }
}
