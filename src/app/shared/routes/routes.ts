import { Routes } from "@angular/router";
import { HomeComponent } from "src/app/features/home/home.component";
import { LoginComponent } from "src/app/features/login/login.component";
import { OrdersListComponent } from "src/app/features/orders-list/orders-list.component";
import { PackagesQueryComponent } from "src/app/features/packages-query/packages-query.component";
import { PackagesReceptionComponent } from "src/app/features/packages-reception/packages-reception.component";
import { UserComponent } from "src/app/features/users/user.component";

export const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "runner/orders",
    component: OrdersListComponent,
  },
  {
    path: "users",
    component: UserComponent,
  },
  {
    path: "reception",
    component: PackagesReceptionComponent,
  },
  {
    path: "costumer",
    component: PackagesQueryComponent,
  },
  {
    path: "**",
    redirectTo: "login",
  },
];
