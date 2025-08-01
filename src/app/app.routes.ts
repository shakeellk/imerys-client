import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Login } from './login/login';
import { Register } from './register/register';
import { Home } from './home/home';
import { Administration } from './administration/administration';


export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: Dashboard, children: [
      {
        path: '',
        component: Home
      },
      {
        path: 'administration',
        component: Administration
      }
    ]
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'register',
    component: Register
  },

];
