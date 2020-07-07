import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { HttpClientModule } from '@angular/common/http';
import { ConfigurationService } from './config/service/config.service';
import { ApiModule } from './api/api.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, ConfigModule, AuthModule, ApiModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [ConfigurationService],
      useFactory: (configurationService: ConfigurationService) => {
        return () => {
          return configurationService.loadAppConfig('/assets/config.json');
        };
      },
    },
  ],
})
export class CoreModule {}
