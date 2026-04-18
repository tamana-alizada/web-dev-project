import { Routes } from '@angular/router';
import { Home } from './component/home/home';
import { Discover } from './component/discover/discover';
import { Shops } from './component/shops/shops';
import { SignIn } from './component/sign-in/sign-in';
import { SignUp } from './component/sign-up/sign-up';
import { Main } from './component/main/main';
import { Cart } from './component/cart/cart';
import { ProfileComponent } from './component/profile/profile';
import { Landing } from './component/landing/landing';
import { authGuard } from './services/auth-guard';
import { OwnerLayout } from './component/owner-layout/owner-layout';
import { OwnerDashboard } from './component/owner-dashboard/owner-dashboard';
import { OwnerProductsComponent } from './component/owner-products/owner-products';
// import { OwnerOrders } from './component/owner-orders/owner-orders';
import { ownerGuard } from './services/owner-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'landing', component: Landing },
  { path: 'sign-in', component: SignIn },
  { path: 'sign-up', component: SignUp },

  {
    path: 'main',
    component: Main,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'discover', pathMatch: 'full' },
      { path: 'discover', component: Discover },
      { path: 'shops', component: Shops },
      { path: 'cart', component: Cart },
      { path: 'profile', component: ProfileComponent }
    ]
  },
  {
  path: 'owner',
  component: OwnerLayout,
  canActivate: [ownerGuard],
  children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: OwnerDashboard },
    { path: 'products', component: OwnerProductsComponent },
    // { path: 'orders', component: OwnerOrders }
  ]
  },

  { path: '**', redirectTo: 'home' }
];