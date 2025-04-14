import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { UsersComponent } from './shared/components/users/users.component';
import { ProductsComponent } from './shared/components/products/products.component';
import { ProductFormComponent } from './shared/components/products/product-form/product-form.component';
import { ProductComponent } from './shared/components/products/product/product.component';

// baseUrl = http://localhost:4200

const routes: Routes = [
  {
    path: 'home', // http://localhost:4200 + 'home' == http://localhost:4200/home
    component: DashboardComponent,
  },
  {
    path: '', // http://localhost:4200 + ''
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'users', // http://localhost:4200/users
    component: UsersComponent,
  },
  {
    path: 'products', // http://localhost:4200/products
    component: ProductsComponent,
  },
  {
    path: 'products/addProduct', // http://localhost:4200/products/addProduct
    component: ProductFormComponent,
  },
  {
    path: 'products/:prodId', // http://localhost:4200/products/123
    component: ProductComponent,
  },
  {
    path: 'products/:prodId/edit', // http://localhost:4200/products/edit
    component: ProductFormComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
