import { Injectable } from '@angular/core';
declare var window: any;

@Injectable()
export class AppInitService {

  public init() {
    return new Promise((resolve) => {
      fetch('assets/branding/app-config.json').then(response => {
        return response.text();
      }).then(config => {
        try {
          if(config)
            window.config = JSON.parse(config);

          if(window.config.stylesheetUrl) {
            let head = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
            link.setAttribute('rel', 'stylesheet');
            link.setAttribute('type', 'text/css');
            link.setAttribute('href', window.config.stylesheetUrl);
            link.setAttribute('media', 'all');
            head.appendChild(link);
          }
        } catch(err) {
          console.error("Error parsing app-config.json:", err);
        }

        return resolve(config);
      }).catch(err => {
        console.error("Error loading app-config.json.", err);
        return resolve(null);
      });
    });
  }
}
