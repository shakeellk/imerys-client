import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import 'zone.js'
import { importProvidersFrom } from '@angular/core';
import { OktaAuthModule } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
const oktaAuth=new OktaAuth({
   issuer:'https://integrator-1921854.okta.com',
   clientId:'0oatwmcugsWjiMZxN697',
   redirectUri: window.location.origin + '/dashboard',
  scopes: ['openid', 'profile', 'email'],
  pkce: true

})
bootstrapApplication(App, {
  providers:[
    appConfig.providers??[],
     importProvidersFrom(
      OktaAuthModule.forRoot({oktaAuth})
    )
  ]
})
  .catch((err) => console.error(err));
