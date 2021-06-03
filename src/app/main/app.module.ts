/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { ToastrModule } from "ngx-toastr";
import { LoginComponent } from "../features/login/login.component";
import { OrdersListComponent } from "../features/orders-list/orders-list.component";
import { PackagesReceptionComponent } from "../features/packages-reception/packages-reception.component";
import { PackagesQueryComponent } from "../features/packages-query/packages-query.component";
import { UserEditComponent } from "../features/users/user-edit/user-edit.component";
import { UserComponent } from "../features/users/user.component";
import { WithdrawZoneComponent } from "../features/withdraw-zone/withdraw-zone.component";
import { BottomNavBarComponent } from "../shared/components/bottom-navbar/bottom-navbar.component";
import { CreateUserFormComponent } from "../shared/components/create-user-form/create-user-form.component";
import { InfiniteScrollTableComponent } from "../shared/components/infinite-scroll-table/infinite-scroll-table.component";
import { MainNavBarComponent } from "../shared/components/main-navbar/main-navbar.component";
import { MainTableComponent } from "../shared/components/main-table/main-table.component";
import { MallGuard } from "../shared/guards/mall-guard";
import { httpInterceptorProviders } from "../shared/interceptors/httpInterceptorsProvider";
import { routes } from "../shared/routes/routes";
import { OrdersService } from "../shared/services/orders.service";
import { PackagesReceptionService } from "../shared/services/packages-reception.service";
import { DateUtil } from "../shared/utils/date";
import { AppComponent } from "./app.component";
@NgModule({
  declarations: [
    AppComponent,
    CreateUserFormComponent,
    MainNavBarComponent,
    BottomNavBarComponent,
    MainTableComponent,
    InfiniteScrollTableComponent,
    OrdersListComponent,
    PackagesReceptionComponent,
    PackagesQueryComponent,
    UserComponent,
    UserEditComponent,
    LoginComponent,
    WithdrawZoneComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    InfiniteScrollModule,
    RouterModule.forRoot(routes),
    RouterTestingModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    DateUtil,
    httpInterceptorProviders,
    OrdersService,
    MallGuard,
    PackagesReceptionService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
