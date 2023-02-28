import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {appInjector} from "./app/core/app-injector";

if (environment.production) {
  enableProdMode();
}

const bootstrap = () => {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .then((appRef)=>{
      appInjector(appRef.injector);
    })
    .catch(err => console.log(err));
};

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

if (document.readyState === 'complete') {
  bootstrap();
} else {
  document.addEventListener('DOMContentLoaded', bootstrap);
}
