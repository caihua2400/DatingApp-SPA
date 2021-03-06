import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {User} from '../../_models/user';
import {ActivatedRoute} from '@angular/router';
import {AlertifyService} from '../../_services/alertify.service';
import {NgForm} from '@angular/forms';
import {UserService} from '../../_services/user.service';
import {AuthService} from '../../_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user : User
  photoUrl: string;
  @ViewChild('editForm',{static: true}) editForm : NgForm;


  constructor(private route : ActivatedRoute,private Alertify : AlertifyService,
              private userService : UserService, private authService : AuthService) {

  }

  ngOnInit() {
    this.route.data.subscribe(data=>{
      this.user= data['user'];
    })
    this.authService.currentPhotoUrl.subscribe(
      photoUrl=>{
        this.photoUrl=photoUrl;
      }
    )
  }

  updateUser() {
    this.userService.updateUser(this.authService.decodedToken.nameid,this.user).subscribe(
      next=>{
        this.Alertify.success('profile updated successfully');
        this.editForm.reset(this.user);
      },error => {
        this.Alertify.error(error);
      }
    );

  }

  UpdateMainPhoto(photoUrl: string) {
    this.user.photoUrl= photoUrl;
  }
}
