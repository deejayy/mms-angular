import { NgModule, InjectionToken, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './service/auth.service';
import { AuthFacade } from './store/auth.facade';
import { AuthEffects } from './store/auth.effects';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthGuard } from './guard/auth.guard';

@NgModule({
  declarations: [],
  providers: [AuthService, AuthFacade, AuthGuard],
  imports: [StoreModule.forFeature('auth', authReducer), EffectsModule.forFeature([AuthEffects]), CommonModule],
})
export class AuthModule {}
