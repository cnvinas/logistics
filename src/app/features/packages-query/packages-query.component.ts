/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { throwIfEmpty } from "rxjs/operators";
import { PackagesStateEnum } from "src/app/shared/enums/packages-state-enum";
import { PackagesReceptionService } from "src/app/shared/services/packages-reception.service";
import { DateUtil } from "src/app/shared/utils/date";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-packages-query",
  templateUrl: "./packages-query.component.html",
  styleUrls: ["./packages-query.component.css"],
})
export class PackagesQueryComponent {
  cols = [];
  rows = [];
  genericErrorMessage =
    "Ocurrieron errores al cargar la información. Por favor intente más tarde";
  items = [];
  changeTab = false;

  constructor() {}

  ngOnInit() {
    this.items = [
      {
        hola: "hola",
        mundo: "mundo",
        esta: "esta",
        es: "es",
        otra: "otra",
        columna: "columna",
        descripcion: "descripcion",
      },
      {
        hola: "hola",
        mundo: "mundo",
        esta: "esta",
        es: "es",
        otra: "otra",
        columna: "columna",
        descripcion: "descripcion",
      },
      {
        hola: "hola",
        mundo: "mundo",
        esta: "esta",
        es: "es",
        otra: "otra",
        columna: "columna",
        descripcion: "descripcion",
      },
      {
        hola: "hola",
        mundo: "mundo",
        esta: "esta",
        es: "es",
        otra: "otra",
        columna: "columna",
        descripcion: "descripcion",
      },
      {
        hola: "hola",
        mundo: "mundo",
        esta: "esta",
        es: "es",
        otra: "otra",
        columna: "columna",
        descripcion: "descripcion",
      },
      {
        hola: "hola",
        mundo: "mundo",
        esta: "esta",
        es: "es",
        otra: "otra",
        columna: "columna",
        descripcion: "descripcion",
      },
      {
        hola: "hola",
        mundo: "mundo",
        esta: "esta",
        es: "es",
        otra: "otra",
        columna: "columna",
        descripcion: "descripcion",
      },
    ];
  }

  displayMorePackagesTab(bool) {
    this.changeTab = bool;
  }
}
