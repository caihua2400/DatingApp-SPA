import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model : any={};

  @Output() cancelEvent=new EventEmitter();
  constructor(private authService : AuthService) {


  }

  ngOnInit() {
  }
  register(){
    this.authService.register(this.model).subscribe(()=>{
       console.log('register success');
    },error => {
      console.log(error);
    });
    console.log(this.model);
  }
  cancel(){
    this.cancelEvent.emit(false);
    console.log('canceld');
  }
}
