import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import InicioComponent from './pages/inicio/inicio.component';

export const routes: Routes = [
    {
        path: 'person',
       // component:InicioComponent
        loadComponent: () => import('../app/pages/inicio/inicio.component')
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
