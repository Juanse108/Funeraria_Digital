import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Chat } from 'src/app/models/chat.model';
import { ChatService } from 'src/app/services/chat.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number
  chat: Chat
  theFormGroup: FormGroup
  trySend: boolean
  constructor(private activateRoute: ActivatedRoute,
    private service: ChatService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.mode = 1;
    this.chat = { id_chat: 0,service_code: 0, content: "", chat_status: "" }
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
      this.chat.id_chat = this.activateRoute.snapshot.params.id;
      this.getEjecution(this.chat.id_chat);
    }
  }
  getEjecution(id: number) {
    this.service.view(id).subscribe(data => {
      this.chat = data
    })
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      service_code: ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(100)
      ]],
      content: ['', [
        Validators.required,
        Validators.maxLength(50)
      ]],
      chat_status: ['', [
        Validators.required,
        Validators.pattern(/^(disponible|no disponible)$/)
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
      this.service.create(this.chat).subscribe(data => {        
        Swal.fire('Completado', 'Se ha creado Correctamente', 'success')
        this.router.navigate(['chats/list'])
      })
    }
  }

  update() {
    this.trySend = true
    if (this.theFormGroup.invalid) {
      Swal.fire('Error', 'Por favor llene correctamente los campos', 'error')
    } else {
      this.service.update(this.chat).subscribe(data => {
        Swal.fire('Completado', 'Se ha creado Correctamente', 'success')
        this.router.navigate(['chats/list'])
      })
    }
  }
}
