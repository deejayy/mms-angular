import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ApiState {
  loading: boolean;
  success: boolean;
  error: boolean;
  data: any;
  errorData: HttpErrorResponse;
}

export interface ApiResultState {
  loading$: Observable<boolean>;
  success$: Observable<boolean>;
  error$: Observable<boolean>;
  data$: Observable<any>;
  errorData$: Observable<HttpErrorResponse>;
}
