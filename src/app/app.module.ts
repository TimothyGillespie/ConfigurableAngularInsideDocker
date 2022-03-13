import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppConfigurationService} from "./app-configuration.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";

const setupConfig = (configService: AppConfigurationService) => () => {
  // Using the init method as a private method like this to not cloak up the API of the service.
  return configService['_init']();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: setupConfig,
    deps: [AppConfigurationService, HttpClient],
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
