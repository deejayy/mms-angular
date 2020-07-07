import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { Store, select } from '@ngrx/store';
import { first, flatMap } from 'rxjs/operators';

import { AuthState } from '../store/auth.state';
import { getAuthenticated } from '../store/auth.selectors';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AuthState>, private router: Router) {}

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.pipe(
      select(getAuthenticated),
      first(),
      flatMap((status) => {
        if (status) {
          return of(status);
        } else {
          this.router.navigate(['/']);
          return of(false);
        }
      }),
    );
  }
}
