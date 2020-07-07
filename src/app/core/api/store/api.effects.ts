import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select, Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, first } from 'rxjs/operators';

import * as ApiActions from './api.actions';
import { ApiService } from '../service/api.service';
import { ApiState } from './api.state';
import { getIsCached } from './api.selectors';

@Injectable()
export class ApiEffects {
  private getApiEndpoint(url?: string): string {
    return url || this.apiService.getApiEndpoint();
  }

  @Effect()
  public getApi$: Observable<Action> = this.actions$.pipe(
    ofType(ApiActions.ApiActionTypes.API_GET),
    mergeMap(({ payload }: ApiActions.ApiGet) =>
      this.store.pipe(
        select(getIsCached(payload.url)),
        first(),
        mergeMap((isCached: boolean) => !isCached || !payload.useExisting
          ? this.apiService.apiCall(`${this.getApiEndpoint(payload.apiUrl)}${payload.url}`, payload.data, payload.auth).pipe(
              map((data: object) => new ApiActions.ApiGetSuccess({ url: payload.url, data })),
              catchError((error: HttpErrorResponse) => of(new ApiActions.ApiGetFail({ url: payload.url, error }))))
          : of(new ApiActions.ApiAlreadyLoaded({ url: payload.url })),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private store: Store<ApiState>,
    private apiService: ApiService,
  ) {}
}
