import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Message } from 'src/app/models/message.model';
import { MessageService } from 'src/app/services/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number
  message: Message
  theFormGroup: FormGroup
  trySend: boolean
  constructor(private activateRoute: ActivatedRoute,
    private service: MessageService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.mode = 1;
    this.message = { id: 0,content: "", date_shipment: "", read: false , id_chat: 0}
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
      this.message.id = this.activateRoute.snapshot.params.id;
      this.getEjecution(this.message.id);
    }
  }
  getEjecution(id: number) {
    this.service.view(id).subscribe(data => {
      this.message = data
    })
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      content: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(200)
      ]],
      date_shipment: ['', [
        Validators.required,
        Validators.pattern(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)
      ]],
      read: [false, [
        Validators.required
      ]],
      id_chat: ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(100)
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
      this.service.create(this.message).subscribe(data => {        
        Swal.fire('Completado', 'Se ha creado Correctamente', 'success')
        this.router.navigate(['messages/list'])
      })
    }
  }

  update() {
    this.trySend = true
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    } else {
      this.service.update(this.message).subscribe(data => {
        Swal.fire('Completado', 'Se ha creado Correctamente', 'success')
        this.router.navigate(['messages/list'])
      })
    }
  }
}
