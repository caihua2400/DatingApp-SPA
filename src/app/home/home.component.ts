import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode: any=false;


  constructor(private Http : HttpClient) { }

  ngOnInit() {

  }

  registerToggle() {
     this.registerMode=true;
  }



  cancelRegister(register : boolean) {
     this.registerMode=register;
  }
}
