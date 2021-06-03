/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class OrdersService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getOrdersList(mallCode: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/order/mall/PEG?state=CREATED&fulfillment=PICKUP`
    );
  }
}
