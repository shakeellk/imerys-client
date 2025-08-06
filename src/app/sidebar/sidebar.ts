import { Component, inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';  // <-- Add this import
import { UserService } from '../user-service';
import { navItems } from '../../constants/nav_items';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';

@Component({
  selector: 'app-sidebar',
  standalone: true,           // Add this for standalone component
  imports: [CommonModule,RouterModule],                // Add needed imports here (e.g. CommonModule if needed)
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']  // Fix typo: styleUrls (plural)
})
export class Sidebar {
  navItems = navItems;
  activeComponent: string;

  // Use inject() properly - don't add 'private' here
  private router = inject(Router);
 oktaauth:OktaAuth|null=null; 
  constructor(private route:Router,private userService: UserService){
    this.activeComponent = this.userService.getActiveComponent();
    const platformId=inject(PLATFORM_ID);

    if(isPlatformBrowser(platformId)){
       
      this.oktaauth=inject(OKTA_AUTH)
          
    }

  }
 

  handleChangeComponent(component: string) {
    console.log(component);
    this.router.navigate([`/dashboard/${component.toLowerCase()}`]); // Navigate to the component's route
    this.userService.setActiveComponent(component);
  }

  handleLogOut() {
    this.oktaauth?.signOut()
    this.userService.changeData('');
    this.router.navigate(['/login']);
  }
}
