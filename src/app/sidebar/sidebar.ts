import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';  // <-- Add this import
import { UserService } from '../user-service';
import { navItems } from '../../constants/nav_items';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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

  constructor(private userService: UserService) {
    this.activeComponent = this.userService.getActiveComponent();
  }

  handleChangeComponent(component: string) {
    console.log(component);
    this.router.navigate([`/dashboard/${component.toLowerCase()}`]); // Navigate to the component's route
    this.userService.setActiveComponent(component);
  }

  handleLogOut() {
    this.userService.changeData('');
    this.router.navigate(['/login']);
  }
}
