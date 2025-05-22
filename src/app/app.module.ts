import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ConfigServiceService } from './Services/config-service/config-service.service';

export function loadConfig(config: ConfigServiceService) {
  return () => config.loadConfig();
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
        {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [ConfigServiceService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
