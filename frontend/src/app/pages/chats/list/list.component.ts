import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chat } from 'src/app/models/chat.model';
import { ChatService } from 'src/app/services/chat.service';
import { ServiceExecutionService } from 'src/app/services/service-execution.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  chats: Chat []
  chats_aux: Chat []
  service_code: number
  constructor( private service:ChatService, 
    private router:Router,
    private route: ActivatedRoute,
    private serviceExecutionService: ServiceExecutionService,
    private chatService: ChatService,
  ) { 
    this.chats = []
  }

  ngOnInit(): void {
    this.listChats()
  }

  listChats() {
    this.chatService.list().subscribe(data => {
      this.chats = data
    })
  }

  create(){
    this.router.navigate(['chats/create/'])
  }

  view(id:number){
    this.router.navigate(['chats/view/'+id])
  }

  update(id:number){
    this.router.navigate(['chats/update/'+id])
  }

  listMessages(id:number){
    this.router.navigate(["messages/list/"], { queryParams: { chatId: id } })
  }

  delete(id: number){    
    Swal.fire({
      title: 'Eliminar el chat',
      text: "Está seguro que quiere eliminar el chat",
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
      'El chat ha sido eliminado correctamente',
      'success'
      )
      this.ngOnInit();
      });
      }
      })
    };

}
