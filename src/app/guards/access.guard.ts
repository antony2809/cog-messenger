import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccessGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const user = JSON.parse(localStorage.getItem('currentUser')) || null;
    const loggedIn = !!user;

    switch (route.data.url) {
      case 'picker':
        if (loggedIn) {
          this.router.navigate([]);
          return false;
        }
        break;

      default:
        if (!loggedIn) {
          this.router.navigate(['username-picker']);
          return false;
        }
        break;
    }
    return true;
  }
}
