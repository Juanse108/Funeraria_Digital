import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Permission } from 'src/app/models/permission.model';
import { RolePermission } from 'src/app/models/role-permission.model';
import { Role } from 'src/app/models/role.model';
import { PermissionService } from 'src/app/services/permission.service';
import { RolePermissionService } from 'src/app/services/role-permission.service';
import { RoleService } from 'src/app/services/role.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1->View, 2-> Create, 3->Update
  role_permission: RolePermission;
  formGroup: FormGroup;
  trySend: boolean;

  roles: Role[]
  permissions: Permission[]

  constructor(
    private activateRoute: ActivatedRoute,
    private service: RolePermissionService,
    private router: Router,
    private formBuilder: FormBuilder,
    private theRoleService: RoleService,
    private thePermissionService: PermissionService,
  ) {
    this.trySend = false;
    this.mode = 1;
    this.role_permission = { role: null, permission: null };
  }

  listRoles() {
    this.theRoleService.list().subscribe(data => {
      this.roles = data;
      console.log(data);
    })
  }

  listPermission() {
    this.thePermissionService.list().subscribe(data => {
      this.permissions = data;
      console.log(data);
    })
  }

  ngOnInit(): void {
    this.listRoles();
    // FIXME - Not working?
    this.listPermission();
    this.configFormGroup();
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.role_permission._id = this.activateRoute.snapshot.params.id;
      this.getRolePermission(this.role_permission._id);
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

  get getRoleRolePermissionFormGroup() {
    return this.formGroup.controls;
  }

  getRolePermission(id: string) {
    this.service.view(id).subscribe(data => {
      this.role_permission = data;
    });
  }

  create() {
    this.trySend = true;
    if (this.formGroup.invalid) {
      Swal.fire("Error", "Por favor llene correctamente los campos", "error");
    } else {
      this.service.create(this.role_permission.role._id, this.role_permission.permission._id).subscribe(data => {
        Swal.fire(
          'Completado', 'Se ha creado Correctamente', 'success'
        );
        this.router.navigate(['permissions/list']);
      });
    }
  }
}
