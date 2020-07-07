import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { apiReducer } from './store/api.reducer';
import { ApiEffects } from './store/api.effects';
import { ApiFacade } from './store/api.facade';
import { ApiService } from './service/api.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    StoreModule.forFeature('api', apiReducer),
    EffectsModule.forFeature([ApiEffects]),
  ],
  providers: [
    ApiFacade,
    ApiService,
  ],
})
export class ApiModule {}
