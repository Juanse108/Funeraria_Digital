import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'src/app/models/message.model';
import { ChatService } from 'src/app/services/chat.service';
import { MessageService } from 'src/app/services/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  messages: Message []
  messages_aux: Message []
  chat: number
  constructor( private service:MessageService, 
    private router:Router,
    private route: ActivatedRoute,
    private  chatService: ChatService) { 
    this.messages = []
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      let chatId = params['chatId'];
      this.list(chatId);
    })
  }

  list (chatId:number) {

    this.chatService.view(chatId).subscribe(data=>{
      
      this.chat = chatId;
      this.messages = data["messages"];
      this.messages_aux = [];
  
      for(let message of this.messages){
        this.service.view(message.id).subscribe(data => {
          this.messages_aux.push(data);
        })
      }
  
      console.log(JSON.stringify(this.messages));
    });
  }

  create(){
    this.router.navigate(['messages/create/'])
  }

  view(id:number){
    this.router.navigate(['messages/view/'+id])
  }

  update(id:number){
    this.router.navigate(['messages/update/'+id])
  }

  delete(id: number){
    Swal.fire({
      title: 'Eliminar el mensaje',
      text: "Está seguro que quiere eliminar el mensaje ",
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
      'El mensaje ha sido eliminado correctamente',
      'success'
      )
      this.ngOnInit();
      });
      }
      })
    };

}

