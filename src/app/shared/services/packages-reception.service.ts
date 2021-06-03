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
export class PackagesReceptionService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getBusinessPartners(): Observable<any> {
    return of([
      {
        id: 12345,
        name: "Blue Express",
      },
      {
        id: 2,
        name: "Chilexpress",
      },
      {
        id: 3,
        name: "Vtex",
      },
    ]);
  }

  getLastPackages(
    mallCode,
    partnerCode,
    todayDate,
    fromDate,
    state
  ): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/order/malls/PEG/partners/${partnerCode}?state=${state}&dateFrom=${fromDate}&dateTo=${todayDate}`
    );
  }

  getTodayPackages(mallCode, partnerCode, todayDate, state): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/order/malls/PEG/partners/${partnerCode}?state=${state}&dateFrom=${todayDate}`
    );
  }

  getPackageBycode(mallCode, partnerCode, packageNumber): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/order/malls/PEG/partners/${partnerCode}/packages/${packageNumber}?state=CREATED`
    );
  }

  savePackages(mallCode, partnerCode, packages) {
    return this.http.post(
      `${this.apiUrl}/scheduler/reception/malls/PEG/partners/${partnerCode}`,
      packages
    );
  }
}
