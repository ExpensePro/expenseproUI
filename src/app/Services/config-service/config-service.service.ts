import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigServiceService {

  private config: any;

  constructor(private http: HttpClient) { }

  loadConfig(): Promise<void> {
    return this.http.get('/assets/config/config.json').
      toPromise().then(config => {
        this.config = config;
        console.log(this.config);
      })
      .catch(err => {
        console.error('[RuntimeConfig] Failed to load config:', err);
        return Promise.resolve(); // prevent app from crashing
      });
  }
}
