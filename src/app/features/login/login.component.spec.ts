import { HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed, inject } from "@angular/core/testing";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { of, throwError } from "rxjs";
import { AppComponent } from "src/app/main/app.component";
import { errors } from "src/app/shared/constants/errors.constants";
import { AuthenticationService } from "src/app/shared/services/authentication.service";
import { LoginComponent } from "./login.component";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthenticationService;
  let toasterService: ToastrService;
  let routerService: Router;
  let formBuilder: FormBuilder;
  const RouterSpy = jasmine.createSpyObj("Router", ["navigate"]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, LoginComponent],
      providers: [
        AuthenticationService,
        ToastrService,
        { provide: Router, useValue: RouterSpy },
      ],
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        ToastrModule.forRoot(),
        RouterTestingModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(inject(
    [AuthenticationService, FormBuilder, ToastrService, Router],
    (a, f, t, r) => {
      authService = a;
      formBuilder = f;
      toasterService = t;
      routerService = r;
      const error = errors;
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }
  ));

  it("should create login component", () => {
    expect(component).toBeTruthy();
  });

  it("should login user, create a sessionStorage object with user data and redirect to 'runner/orders'", () => {
    const loginForm = {
      value: {
        email: "c.vinas@globant.com",
        password: "123456",
      },
    };
    spyOn(authService, "login").and.returnValue(of(true));

    component.login(loginForm);
    fixture.detectChanges();
    expect(window.sessionStorage.getItem("res")).toBeTruthy();
    expect(routerService.navigate).toHaveBeenCalledWith(["home"]);
  });

  it("should not login user, throw error and show toaster error messages", () => {
    const loginForm = {
      value: {
        email: "unefined@user.com",
        password: "badPassword",
      },
    };
    spyOn(authService, "login").and.callFake(() => {
      return throwError({ status: "401" });
    });
    spyOn(toasterService, "error");

    component.login(loginForm);
    fixture.detectChanges();
    expect(toasterService.error).toHaveBeenCalledTimes(1);
    expect(toasterService.error).toHaveBeenCalledWith(errors.Unauthorized);
    expect(authService.login).toHaveBeenCalledWith(
      loginForm.value.email,
      loginForm.value.password
    );
  });

  it("should not login user, throw error and show Failed toaster error message", () => {
    const loginForm = {
      value: {
        email: "unefined@user.com",
        password: "badPassword",
      },
    };
    spyOn(authService, "login").and.callFake(() => {
      return throwError({ status: "500" });
    });
    spyOn(toasterService, "error");

    component.login(loginForm);
    fixture.detectChanges();
    expect(toasterService.error).toHaveBeenCalledTimes(1);
    expect(authService.login).toHaveBeenCalledWith(
      loginForm.value.email,
      loginForm.value.password
    );
  });
});
