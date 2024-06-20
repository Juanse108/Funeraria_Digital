import { Component, OnInit } from '@angular/core';
import { SocketChatsService } from 'src/app/services/socket-chats.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  text = '';

  constructor(public chat: SocketChatsService) { }

  ngOnInit(): void { }

  sendMessage() {
    let messageInfo = {
      text: this.text,
      messageType: 1
    };
    this.chat.sendMessage(messageInfo);
    this.text = '';
  }
}
