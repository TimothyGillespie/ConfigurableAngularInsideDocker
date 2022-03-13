import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppConfigurationService {

  _cachedConfig?: AppConfiguration;

  constructor(private httpClient: HttpClient) { }

  // Read-Only
  get config(): AppConfiguration {
    if(!this._cachedConfig)
      throw new Error('Configuration have not been initialized');

    return this._cachedConfig;
  }

  private _init(): Observable<AppConfiguration> {
    return this.httpClient.get<AppConfiguration>('/assets/config/config.json').pipe(
      tap(config => {
        this._cachedConfig = config;
      })
    );
  }
}

export interface AppConfiguration {
  aNumber: number;
  aString: string;
  anObject: {
    insideTheObject: string;
  }
  anArray: string[];
}
