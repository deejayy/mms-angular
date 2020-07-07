import { Action } from '@ngrx/store';
import { ApiCallItem } from '../model/api-call-item.model';

export enum ApiActionTypes {
  API_GET = '[API] Get',
  API_GET_SUCCESS = '[API] Get success',
  API_GET_FAIL = '[API] Get fail',
  API_ALREADY_LOADED = '[API] Already loaded',
  API_CLEAR = '[API] Clear',
}

export class ApiGet implements Action {
  public readonly type = ApiActionTypes.API_GET;
  constructor(public payload: ApiCallItem) {}
}

export class ApiGetSuccess implements Action {
  public readonly type = ApiActionTypes.API_GET_SUCCESS;
  constructor(public payload: ApiCallItem) {}
}

export class ApiGetFail implements Action {
  public readonly type = ApiActionTypes.API_GET_FAIL;
  constructor(public payload: ApiCallItem) {}
}

export class ApiAlreadyLoaded implements Action {
  public readonly type = ApiActionTypes.API_ALREADY_LOADED;
  constructor(public payload: ApiCallItem) {}
}

export class ApiClear implements Action {
  public readonly type = ApiActionTypes.API_CLEAR;
  constructor(public payload: ApiCallItem) {}
}

export type ApiActions = ApiGet | ApiGetSuccess | ApiGetFail | ApiAlreadyLoaded | ApiClear;
