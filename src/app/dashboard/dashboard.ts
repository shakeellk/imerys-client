import { Component } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { Router, RouterModule } from '@angular/router';
import { navItems } from '../../constants/nav_items';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  navItems = navItems;
  img:string = '/assets/icons/menu.png';
  constructor(private router: Router) { }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);

  }
}
