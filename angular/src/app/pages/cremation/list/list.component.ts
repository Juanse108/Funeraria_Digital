import { Component, OnInit } from '@angular/core';
import {CremationService} from "../../../services/cremation.service";
import {Cremation} from "../../../models/cremation.model";
import Swal from "sweetalert2";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  cremation:Cremation[];
  constructor(private service:CremationService) {
    this.cremation=[];
  }

  ngOnInit(): void {
    this.list()
  }
  list (){
    this.service.list().subscribe(data => {
      this.cremation=data;
    })
  }
  delete(id: number) {
    Swal.fire({
      title: "Eliminar registro",
      text: "Está seguro que quiere eliminar el registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe((data) => {
          Swal.fire(
            "Eliminado!",
            "El registro ha sido eliminado correctamente",
            "success"
          );
          this.ngOnInit();
        });
      }
    });
  }
}
