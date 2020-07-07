import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const getAuthState = createFeatureSelector<AuthState>('auth');
export const getAuthenticated = createSelector(getAuthState, (state: AuthState) => state.authenticated);
export const getAccessToken = createSelector(getAuthState, (state: AuthState) => state.data.token);
export const getAuthMessage = createSelector(getAuthState, (state: AuthState) => state.authMessage);
