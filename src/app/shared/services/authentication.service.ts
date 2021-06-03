/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  userName = "user";
  userData: any;
  public currentUser: Observable<any>;
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const auth = "Basic " + window.btoa(username + ":" + password);
    return this.http.post<any>(
      `${environment.apiUrl}/auth/login`,
      {},
      {
        headers: { Authorization: auth },
      }
    );
  }

  getAuthorizationToken() {
    const storageItem = JSON.parse(sessionStorage.getItem("res"));
    return storageItem.accessToken;
  }
}
