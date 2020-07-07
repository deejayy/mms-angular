import { ApiState } from './api.state';
import { ApiActions, ApiActionTypes } from './api.actions';
import { produce } from 'immer';

const initialState: ApiState = {
  loading: false,
  success: false,
  error: false,
  data: null,
  errorData: null,
};

export function apiReducer(
  state: ApiState = initialState,
  action: ApiActions,
): ApiState {
  return produce(state, (draft: ApiState) => {
    switch (action.type) {
      case ApiActionTypes.API_GET:
        draft[action.payload.url] = {
          ...(draft[action.payload.url] || {}),
          loading: true,
          error: false,
          success: false,
        };
        break;

      case ApiActionTypes.API_GET_SUCCESS:
        draft[action.payload.url] = {
          ...(draft[action.payload.url] || {}),
          loading: false,
          error: false,
          success: true,
          data: { ...action.payload.data },
        };
        break;

      case ApiActionTypes.API_ALREADY_LOADED:
        draft[action.payload.url] = {
          ...(draft[action.payload.url] || {}),
          loading: false,
          error: false,
          success: true,
        };
        break;

      case ApiActionTypes.API_CLEAR:
        draft[action.payload.url] = initialState;
        break;

      case ApiActionTypes.API_GET_FAIL:
        draft[action.payload.url] = {
          ...(draft[action.payload.url] || {}),
          loading: false,
          success: false,
          data: null,
          error: true,
          errorData: { ...action.payload.error },
        };
        break;
    }
  });
}
