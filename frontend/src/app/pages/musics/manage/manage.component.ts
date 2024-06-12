import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Music } from 'src/app/models/music.model';
import { Type } from 'src/app/models/type.model';
import { MusicService } from 'src/app/services/music.service';
import { TypeService } from 'src/app/services/type.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number
  music: Music
  theFormGroup: FormGroup
  trySend: boolean
  types: Type []
  constructor(private activateRoute: ActivatedRoute,
    private service: MusicService,
    private typeService: TypeService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.types = []
    this.mode = 1;
    this.music = { id: 0, nombre: "", nombre_grupo: "", valor_hora:0, tipo_musica:{ id: -1 }}
  }

  ngOnInit(): void {
    this.typesList()
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
      this.music.id = this.activateRoute.snapshot.params.id;
      this.getEjecution(this.music.id);
    }
  }
  getEjecution(id: number) {
    this.service.view(id).subscribe(data => {
      this.music = data
    })
  }

  typesList() {
    this.typeService.list().subscribe(data => {
      this.types = data
    })
  }
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      id: [],
      nombre: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]],
      nombre_grupo: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]],
      valor_hora: [0, [
        Validators.required,
        Validators.min(0),
        Validators.max(100000)
      ]],
      idType: [null, Validators.required]

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
      this.service.create(this.music).subscribe(data => {        
        Swal.fire('Completado', 'Se ha creado Correctamente', 'success')
        console.log(this.music);        
      })
    }
  }
}

