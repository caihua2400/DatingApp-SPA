import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../_models/user';




@Injectable()
export class UserService{
  Url:string= environment.apiUrl;
  constructor(private Http : HttpClient){

  }

  getUsers() : Observable<User[]>{
     return this.Http.get<User[]>(this.Url+'users');
  }

  getUser(id : number) : Observable<User>{
      return this.Http.get<User>(this.Url+'users/'+id);
  }

  updateUser(id : number,user : User){
    return this.Http.put(this.Url+ 'users/' +id,user);
  }

  setMainPhoto(userId : number, id : number){
     return this.Http.post(this.Url + "users/" +userId+ "/photos/"+id+"/setMain",{});
  }

  deletePhoto(userId : number, id : number){
    return this.Http.delete(this.Url + "users/" +userId+ "/photos/"+id);
  }
}
