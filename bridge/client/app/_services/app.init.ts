import { Injectable } from '@angular/core';
import { from } from 'rxjs';
declare var window: any;

@Injectable()
export class AppInitService {

  public init() {
    return from(
      fetch('assets/branding/app-config.json').then(response => {
        return response.json();
      }).then(config => {
        if(config)
          window.config = config;
      })
    ).toPromise();
  }
}
