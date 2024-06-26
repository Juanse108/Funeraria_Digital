import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';  // Ajusta la ruta según tu proyecto
import { RoleService } from 'src/app/services/role.service';  // Ajusta la ruta según tu proyecto
import { User } from 'src/app/models/user.model';  // Ajusta la ruta según tu proyecto
import { Role } from 'src/app/models/role.model';  // Ajusta la ruta según tu proyecto

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number; // 1->View, 2-> Create, 3->Update
  user: User;
  userFormGroup: FormGroup;
  trySend: boolean;
  roles: Role[];
  constructor(private activateRoute: ActivatedRoute,
    private service: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private roleService: RoleService) {
    this.trySend = false;
    this.mode = 1;
    this.roles = [];
    this.user = { name: '', email: '', password: '', role: null };
  }

  rolesList() {
    this.roleService.list().subscribe(
      data => { this.roles = data; }
    );
  }

  ngOnInit(): void {
    this.rolesList();
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
      this.user._id = this.activateRoute.snapshot.params.id;
      this.getUser(this.user._id);
    }
  }


  configFormGroup() {
    this.userFormGroup = this.formBuilder.group({
      id: [null, []],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', this.mode === 2 ? [Validators.required, Validators.minLength(8), Validators.maxLength(20)] : []],
      role: [null, []],
    });
  }

  get getUserFormGroup() {
    return this.userFormGroup.controls;
  }

  getUser(id: string) {
    this.service.view(id).subscribe(data => {
      this.user = data;
    });
  }

  create() {
    this.trySend = true;
    if (this.userFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene correctamente los campos", "error");
    } else {
      // Verifica los datos antes de enviarlos
      const newUser: User = {
        name: this.userFormGroup.value.name,
        email: this.userFormGroup.value.email,
        password: this.userFormGroup.value.password,
        role: this.userFormGroup.value.role // Aquí se guarda todo el objeto role
      };
      console.log('Datos del nuevo usuario:', newUser);
  
      this.service.create(newUser).subscribe(
        data => {
          Swal.fire('Completado', 'Se ha creado Correctamente', 'success');
          this.router.navigate(['users/list']);
        }
      );
    }
  }
  
  
  assignRole(userId: string, roleId: string) {
    this.service.assignRole(userId, roleId).subscribe(response => {
      Swal.fire('Completado', 'Usuario y rol creados correctamente', 'success');
      this.router.navigate(['users/list']);
    });
  }
  

  update() {
    this.trySend = true;
    if (this.userFormGroup.invalid) {
      Swal.fire("Error", "Por favor llene correctamente los campos", "error");
    } else {
      // Verifica los datos antes de enviarlos
      const newUser: User = {
        name: this.userFormGroup.value.name,
        email: this.userFormGroup.value.email,
        password: this.userFormGroup.value.password,
        role: this.userFormGroup.value.role // Aquí se guarda todo el objeto role
      };
      console.log('Datos del nuevo usuario:', newUser);
  
      this.service.update(newUser).subscribe(
        data => {
          Swal.fire('Completado', 'Se ha creado Correctamente', 'success');
          this.router.navigate(['users/list']);
        }
      );
    }
  }
}
