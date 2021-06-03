/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from "@angular/core";
import {
  CanActivate,
  UrlTree,
  ActivatedRoute,
  Router,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { MallsEnum } from "../enums/malls-enum";

@Injectable({
  providedIn: "root",
})
export class MallGuard implements CanActivate {
  mall;
  constructor(private route: ActivatedRoute, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    switch (route.params.mall) {
      case MallsEnum.PAL:
      case MallsEnum.PAN:
      case MallsEnum.PCA:
      case MallsEnum.PCO:
      case MallsEnum.PEG:
      case MallsEnum.PIQ:
      case MallsEnum.PLD:
      case MallsEnum.PNO:
      case MallsEnum.PTR:
      case MallsEnum.PVE:
        return true;
      case undefined:
      default:
        void this.router.navigate([""]);
    }
  }
}
