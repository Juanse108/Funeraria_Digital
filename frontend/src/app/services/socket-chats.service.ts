import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class SocketChatsService {
  chats = []
  constructor(private http: HttpClient, private socket:SocketService) { 
    this.onRecieveMessage()
  }
  
  sendMessage(messageInfo){
    this.chats.push(messageInfo)
    this.socket.io.emit("sendMessage", messageInfo)
  }

  onRecieveMessage(){
    this.socket.io.on("recieveMessage", (messageInfo) =>{
      messageInfo.messageType = 2;
      this.chats.push(messageInfo)
    } )
  }
}
