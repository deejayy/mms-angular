import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
import { first, flatMap, catchError, map } from 'rxjs/operators';

import { AuthService } from '@core/auth/service/auth.service';
import { ConfigurationService } from '@core/config/service/config.service';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private configurationService: ConfigurationService,
  ) {}

  public getApiEndpoint() {
    return this.configurationService.get('apiEndpoint');
  }

  private apiCallInternal(url: string, payload?: object, headers?: HttpHeaders): Observable<Object> {
    if (payload instanceof FileList) {
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      const formData: FormData = new FormData();
      formData.append('files', payload[0]);
      payload = formData;
    }

    return this.http.request(payload ? 'POST' : 'GET', url, { body: payload, headers });
  }

  private apiCallAuthenticated(url: string, payload?: object): Observable<Object> {
    return this.authService.accessToken$.pipe(
      first(),
      map((token: string) => new HttpHeaders({ Authorization: `Bearer ${token}` })),
      flatMap((headers: HttpHeaders) =>
        this.apiCallInternal(url, payload, headers).pipe(
          catchError((error: HttpErrorResponse) => error.status === 401
            ? (this.authService.deauthenticate(), throwError('401 - Unauthorized'))
            : throwError(error),
          ),
        ),
      ),
    );
  }

  public apiCall(url: string, payload?: object, needsAuthorization?: boolean): Observable<Object> {
    return needsAuthorization
      ? this.apiCallAuthenticated(url, payload)
      : this.apiCallInternal(url, payload);
  }
}
