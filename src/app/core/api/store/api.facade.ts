import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { ApiGet, ApiClear } from './api.actions';
import { ApiState, ApiResultState } from './api.state';
import * as apiSelectors from './api.selectors';
import { ApiCallItem } from '../model/api-call-item.model';

@Injectable()
export class ApiFacade {
  constructor(private store: Store<ApiState>) {}

  public callApi(item: ApiCallItem): void {
    this.store.dispatch(new ApiGet({ ...item }));
  }

  public clearResults(item: ApiCallItem): void {
    this.store.dispatch(new ApiClear({ ...item }));
  }

  public createApiResults(item: ApiCallItem): ApiResultState {
    return {
      loading$: this.store.pipe(select(apiSelectors.isApiLoading(item.url))),
      success$: this.store.pipe(select(apiSelectors.getApiSuccess(item.url))),
      data$: this.store.pipe(select(apiSelectors.getApiResult(item.url))),
      error$: this.store.pipe(select(apiSelectors.getApiError(item.url))),
      errorData$: this.store.pipe(select(apiSelectors.getApiErrorData(item.url))),
    };
  }
}
