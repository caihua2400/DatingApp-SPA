import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {MemberEditComponent} from '../members/member-edit/member-edit.component';
import {Observable} from 'rxjs';


@Injectable()
export class PreventUnsavedChangesGuard implements CanDeactivate<MemberEditComponent>{
  canDeactivate(component: MemberEditComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(component.editForm.dirty){
         return confirm("if you leave, any unsaved changes will be dropped !");
    }
    return true;
  }

}
