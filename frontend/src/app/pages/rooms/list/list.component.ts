import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from 'src/app/models/room.model';
import { RoomService } from 'src/app/services/room.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  rooms: Room []
  constructor( private service:RoomService, private router:Router) { 
    this.rooms = []
  }

  ngOnInit(): void {
    this.list();
  }
  list(){
    this.service.list().subscribe( data =>{
      this.rooms = data
      console.log(JSON.stringify(this.rooms));
    })
  }
  create(){
    this.router.navigate(['rooms/create/'])
  }

  view(id:number){
    this.router.navigate(['rooms/view/'+id])
  }

  update(id:number){
    this.router.navigate(['rooms/update/'+id])
  }
  delete(id: number){
    Swal.fire({
      title: 'Eliminar la sala',
      text: "Está seguro que quiere eliminar la sala ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, Cancelar'
      }).then((result) => {
      if (result.isConfirmed) {
      this.service.delete(id).
      subscribe(data => {
      Swal.fire(
      'Eliminado!',
      'La sala ha sido eliminado correctamente',
      'success'
      )
      this.ngOnInit();
      });
      }
      })
    };

}
