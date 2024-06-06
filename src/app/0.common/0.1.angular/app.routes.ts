import { Routes } from '@angular/router';
import { authGuard } from '../../3.transversal/3.3.guard/auth.guard';

export const routes: Routes = [{
    'path': '', 
    loadComponent: () => import('./../../1.view/1.1.pages/start.page/start.page'),
    canActivate: [authGuard]
},{
    'path': 'login', 
    loadComponent: () => import('./../../1.view/1.1.pages/login.page/login.page')
},{
    path: 'cats',
    loadComponent: () => import('../../1.view/1.1.pages/cats.page/cats.page')
},{ 
    path: '**', 
    redirectTo: '' 
}];