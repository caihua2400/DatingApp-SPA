import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../_models/message';
import {UserService} from '../../_services/user.service';
import {AuthService} from '../../_services/auth.service';
import {AlertifyService} from '../../_services/alertify.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {

  @Input() recipientId : number;
  messages : Message[];

  constructor(private userService : UserService, private authService : AuthService, private alertifyService : AlertifyService) {

  }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages(){
    this.userService.getMessageThread(this.authService.decodedToken.nameid,this.recipientId)
      .subscribe(messages =>{
        this.messages=messages;
      }, error => {
        this.alertifyService.error(error);
      });
  }

}
