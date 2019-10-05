import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, MapOperator} from 'rxjs/internal/operators/map';
import {AlertifyService} from './alertify.service';
import {JwtHelperService} from '@auth0/angular-jwt';


@Injectable(

)
export class AuthService{
  baseUrl='http://localhost:5000/api/auth/';
  jwtHelper=new JwtHelperService();
  decodedToken: any;
 constructor(private Http: HttpClient,private alertify: AlertifyService){

 }

 login(model : any){
   return this.Http.post(this.baseUrl+'login',model).pipe(
     map((response : any)=>{
        const user=response;
        if(user){
          localStorage.setItem('token',user.token);
          this.decodedToken=this.jwtHelper.decodeToken(user.token);
          console.log(this.decodedToken);
        }
     })
   );
 }

 register(model : any){
    return this.Http.post(this.baseUrl+'register',model);
 }

 loggedIn(){
   const token= localStorage.getItem('token');
   return !this.jwtHelper.isTokenExpired(token);
 }
}
