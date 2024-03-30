import { Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { ProductsComponent } from '../pages/products/products.component';
import { RegisterComponent } from '../pages/register/register.component';
import { WelcomeComponent } from '../pages/welcome/welcome.component';
import { AuthGuard } from '../guards/auth.guard';
import { CreateproductComponent } from '../pages/createproduct/createproduct.component';
import { ProductResolver } from '../guards/products.resolver';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard]},
  { path: 'create', component: CreateproductComponent, resolve: { product: ProductResolver } },
  { path: 'edit/:id', component: CreateproductComponent, resolve: { product: ProductResolver } },
  { path: '', component: WelcomeComponent },
];
