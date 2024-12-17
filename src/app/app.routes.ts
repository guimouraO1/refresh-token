import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        title: 'Login',
        loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
    },
    {
        path: 'member',
        canActivate: [authGuard],
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./pages/dashboard/member-dashboard/dashboard.component').then((m) => m.MemberDashboardComponent),
            }
        ]
    },
    {
        path: 'admin',
        canActivate: [authGuard],
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./pages/dashboard/admin-dashboard/dashboard.component').then((m) => m.AdminDashboardComponent)
            }
        ]
    }
];
