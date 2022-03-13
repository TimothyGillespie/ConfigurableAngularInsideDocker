import { Component } from '@angular/core';
import {AppConfigurationService} from "./app-configuration.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public configService: AppConfigurationService) {}

  getPrettyPrintJson() {
    return JSON.stringify(this.configService.config, null, 4);
  }
}
