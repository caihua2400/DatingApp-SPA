import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../_models/user';
import {PaginatedResult} from '../_models/pagination';
import {map} from 'rxjs/operators';




@Injectable()
export class UserService{
  Url:string= environment.apiUrl;
  constructor(private Http : HttpClient){

  }

  getUsers(page? , itemsPerPage?) : Observable<PaginatedResult<User[]>>{
     const pagedResult : PaginatedResult<User[]> =new PaginatedResult<User[]>();

     let params= new HttpParams();

     if(page != null && itemsPerPage !=null){
        params=params.append('pageNumber',page);
        params=params.append('pageSize',itemsPerPage);

     }
     return this.Http.get<User[]>(this.Url+'users',{observe: 'response',params}).pipe(
       map(response =>{
         pagedResult.result=response.body;
          if(response.headers.get('Pagination') != null){
              pagedResult.pagination= JSON.parse(response.headers.get('Pagination'));
          }
          return pagedResult;
       })
     )
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
