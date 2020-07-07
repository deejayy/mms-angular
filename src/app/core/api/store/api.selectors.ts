import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ApiState } from './api.state';
import { isObject, isArray } from '../helper/util';

export const getApiState = createFeatureSelector<ApiState>('api');

export const isApiLoading = (url: string) => createSelector(getApiState, (state: ApiState) => (state[url] ? state[url].loading : false));

export const getApiError = (url: string) => createSelector(getApiState, (state: ApiState) => (state[url] ? state[url].error : false));

export const getApiSuccess = (url: string) => createSelector(getApiState, (state: ApiState) => (state[url] ? state[url].success : false));

export const getApiResult = (url: string) => createSelector(getApiState, (state: ApiState) => (state[url] ? state[url].data : null));

export const getApiErrorData = (url: string) =>
  createSelector(getApiState, (state: ApiState) => (state[url] ? state[url].errorData : null));

export const getIsCached = (url: string) =>
  createSelector(getApiState, (state: ApiState): boolean | null => {
    if (!state[url]) {
      return null;
    }

    const notEmptyArray = isObject(state[url].data) && isArray(state[url].data) && state[url].data.length;
    const notEmptyObject = isObject(state[url].data) && !isArray(state[url].data) && !!Object.keys(state[url].data).length;
    const notEmptyScalar = !isObject(state[url].data) && state[url].data;
    const isBeingProcessed = state[url].loading;

    return (notEmptyArray || notEmptyObject || notEmptyScalar) && !isBeingProcessed;
  });
