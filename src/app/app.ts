import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
// auth:AuthService|null=null;
//   constructor(private router:Router){ const platformId = inject(PLATFORM_ID);
//     if (isPlatformBrowser(platformId)) {
//       this.auth = inject(AuthService);
//       this.auth.isAuthenticated$.subscribe((val)=>{
//         if(val){
//          this.router.navigateByUrl('dashboard')}
//       })
//     }}
}
