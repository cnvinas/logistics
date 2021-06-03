/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { errors } from "src/app/shared/constants/errors.constants";
import { AuthenticationService } from "src/app/shared/services/authentication.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  defaultItem = "";
  loginForm: FormGroup;
  items = [];
  space = " ";
  invalid = "INVALID";
  fieldTextType = false;
  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    sessionStorage.clear();
    this.loginForm = this.fb.group({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  /* istanbul ignore next */
  enableLoginButton(): boolean {
    return !(
      this.loginForm.controls.email.status !== this.invalid &&
      this.loginForm.controls.password.status !== this.invalid
    );
  }

  login(loginForm) {
    this.authenticationService
      .login(loginForm.value.email, loginForm.value.password)
      .subscribe(
        (res) => {
          sessionStorage.setItem("res", JSON.stringify(res));
          void this.router.navigate(["home"]);
        },
        (err) => {
          if (err.status == "401") {
            this.toastr.error(errors.Unauthorized);
          } else {
            this.toastr.error(errors.Failed);
          }
        }
      );
  }

  /* istanbul ignore next */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
