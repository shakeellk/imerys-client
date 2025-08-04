import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { OktaAuthStateService } from '@okta/okta-angular';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
private authstate:OktaAuthStateService|null=null
  constructor(private route:Router){

    const platformId=inject(PLATFORM_ID);
    if(isPlatformBrowser(platformId)){
      this.authstate=inject(OktaAuthStateService)
     
      this.authstate.authState$.subscribe((s)=>{
        if(s.isAuthenticated){
          this.route.navigateByUrl('dashboard')
          
        }
      })
    }
  }
}
