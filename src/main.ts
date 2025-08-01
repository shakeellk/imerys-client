import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import 'zone.js'
import { provideAuth0 } from '@auth0/auth0-angular';
bootstrapApplication(App, {
  providers:[
    appConfig.providers??[],
     provideAuth0({
      domain: 'dev-ponorztk35bkng7j.us.auth0.com',
      clientId: '3JgE06m85utm0xndGjBMXY8KjhTN5CO2',
      authorizationParams: {
       redirect_uri:window.location.origin +'/dashboard'
      }
    })
  ]
})
  .catch((err) => console.error(err));
