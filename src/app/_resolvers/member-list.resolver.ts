import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {User} from '../_models/user';
import {Injectable} from '@angular/core';
import {Observable,of} from 'rxjs';
import {UserService} from '../_services/user.service';
import {AlertifyService} from '../_services/alertify.service';
import {catchError} from 'rxjs/operators';



@Injectable()
export class MemberListResolver implements Resolve<User[]>{

  pageNumber: number=1;
  pageSize: number=5;
  constructor(private userService : UserService,private router : Router,private alertify : AlertifyService){

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> {
    return this.userService.getUsers(this.pageNumber,this.pageSize).pipe(
      catchError(error=>{
          this.alertify.error('problem retriving data');
          this.router.navigate(['/home']);
          return of(null);
      })
    );
  }

}
