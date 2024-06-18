import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Permission } from 'src/app/models/permission.model';
import { PermissionService } from 'src/app/services/permission.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1->View, 2-> Create, 3->Update
  permission: Permission;
  formGroup: FormGroup;
  trySend: boolean;
  constructor(
    private activateRoute: ActivatedRoute,
    private service: PermissionService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.trySend = false;
    this.mode = 1;
    this.permission = { url: '', method: '' };
  }

  ngOnInit(): void {
    this.configFormGroup();
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.permission._id = this.activateRoute.snapshot.params.id;
      this.getPermission(this.permission._id);
    }
  }

  @ViewChild('myInput') myInputElement: HTMLInputElement;
  getValue() {
    const inputValue = this.myInputElement.value;
  }

  configFormGroup() {
    this.formGroup = this.formBuilder.group({
      id: [null, []],
      url: ['', [Validators.required]],
      method: [null, [Validators.required]],
    });
  }

  get getPermissionFormGroup() {
    return this.formGroup.controls;
  }

  getPermission(id: string) {
    this.service.view(id).subscribe(data => {
      this.permission = data;
    });
  }

  create() {
    this.trySend = true;
    if (this.formGroup.invalid) {
      Swal.fire("Error", "Por favor llene correctamente los campos", "error");
    } else {
      this.service.create(this.permission).subscribe(data => {
        Swal.fire(
          'Completado', 'Se ha creado Correctamente', 'success'
        );
        this.router.navigate(['permissions/list']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.formGroup.invalid) {
      Swal.fire("Error", "Por favor llene correctamente los campos", "error");
    } else {
      this.service.update(this.permission).subscribe(data => {
        Swal.fire(
          'Completado', 'Se ha actualizado Correctamente', 'success'
        );
        this.router.navigate(['permissions/list']);
      });
    }
  }
}
