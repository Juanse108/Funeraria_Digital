import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tfa',
  templateUrl: './tfa.component.html',
  styleUrls: ['./tfa.component.scss']
})
export class TfaComponent implements OnInit {

  token: string = ''; // Token para el segundo factor de autenticación
  userId: string = ''; // ID del usuario para el segundo factor de autenticación

  constructor(private service: SecurityService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId') || '';
  }

  verifyToken() {
    this.service.tfa(this.userId, this.token).subscribe({
      next: (data) => {
        if (data && data.token) {
          this.service.saveSession(data); // Guarda la sesión
          this.router.navigate(["dashboard"]);
          Swal.fire("Autenticación exitosa", "Has iniciado sesión correctamente", "success");
        } else {
          Swal.fire("Autenticación invalida", "Código de verificación inválido o respuesta inesperada del servidor", "error");
        }
      },
      error: (error) => {
        Swal.fire("Autenticación invalida", "Token incorrecto", "error");
      }
    });
  }
}
