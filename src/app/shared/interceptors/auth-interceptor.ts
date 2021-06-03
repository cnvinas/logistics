import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthenticationService } from "../services/authentication.service";

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthenticationService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const re = "/login";
    // Exclude interceptor for login request:
    if (req.url.search(re) === -1) {
      // Get the auth token from the service.
      const authToken = this.auth.getAuthorizationToken();
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
          Retry: "true",
        },
      });
    }

    return next.handle(req).pipe(
      catchError((response) => {
        if (response.status === 401) {
          this.handleRequest(req);
        }
        return throwError(response);
      })
    );
  }
  private async handleRequest(request: HttpRequest<any>) {
    const isRetriedRequest = request.headers.get("retry");

    if (isRetriedRequest) {
      await this.logout();
    }
  }

  logout() {
    sessionStorage.clear();
    void this.router.navigate([""]);
  }
}
