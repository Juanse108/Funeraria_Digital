import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { SecurityService } from 'src/app/services/security.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  theUser: User;

  constructor(private service: SecurityService, private router: Router) {
    this.theUser = {
      email: "", 
      password: "",
      name: ""
    };
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  login() {
    this.service.login(this.theUser).subscribe({
      next: (data) => {
        console.log("Login response: ", data);
        if (data) {
          this.router.navigate([`tfa/${data}`]); // Navegar a la ruta con el userId como parámetro
          Swal.fire("Código de Verificación Enviado", "Revisa tu correo para el código de verificación", "info");
        } else {
          Swal.fire("Autenticación invalida", "Respuesta inesperada del servidor", "error");
        }
      },
      error: (error) => {
        Swal.fire("Autenticación invalida", "Usuario o contraseña invalido", "error");
      }
    });
  }
}
