import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from 'src/app/models/room.model';
import { RoomService } from 'src/app/services/room.service';
import { Site } from 'src/app/models/site.model';
import { SiteService } from 'src/app/services/site.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  rooms: Room []
  site: number

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private siteService: SiteService,
    private router: Router) { 
    this.rooms = []
  }

  ngOnInit(): void {
    this.listRooms();
  }

  listRooms() {
    this.route.queryParams.subscribe(params => {
      this.site = params['siteId'];
      
      if (this.site != null) {
        this.siteService.view(this.site).subscribe(data => {
          this.rooms = data["rooms"];
          console.log(data);
          
        })
      } else {
        this.roomService.list().subscribe(data => {
          this.rooms = data
        })
      }

      console.log(`The rooms: ${this.rooms}`);
      
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
      this.roomService.delete(id).
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
