import { Routes } from '@angular/router'; // Updated routes

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.page').then((m) => m.AboutPage),
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services.page').then((m) => m.ServicesPage),
  },
  {
    path: 'portfolio',
    loadComponent: () => import('./pages/portfolio/portfolio.page').then((m) => m.PortfolioPage),
  },
  {
    path: 'courses',
    loadComponent: () => import('./pages/courses/courses.page').then((m) => m.CoursesPage),
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog/blog.page').then((m) => m.BlogPage),
  },
  {
    path: 'careers',
    loadComponent: () => import('./pages/careers/careers.page').then((m) => m.CareersPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

];
