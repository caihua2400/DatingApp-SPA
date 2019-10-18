import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {User} from '../_models/user';
import {Injectable} from '@angular/core';
import {Observable,of} from 'rxjs';
import {UserService} from '../_services/user.service';
import {AlertifyService} from '../_services/alertify.service';
import {catchError} from 'rxjs/operators';
import {AuthService} from '../_services/auth.service';



@Injectable()
export class MemberEditResolver implements Resolve<User>{
  constructor(private userService : UserService,private router : Router,
              private alertify : AlertifyService,private authService : AuthService){

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Promise<User> | User {
    return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
      catchError(error=>{
          this.alertify.error('problem retriving data from member-edit');
          this.router.navigate(['/members']);
          return of(null);
      })
    );
  }

}
