import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {RoomService} from "../../../services/room.service";
import {Room} from "../../../models/room.model";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  hall:Room[];
  constructor(private service:RoomService) {
    this.hall=[];
  }

  ngOnInit(): void {
    this.list()
  }
  list (){
    this.service.list().subscribe(data => {
      this.hall=data;
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
