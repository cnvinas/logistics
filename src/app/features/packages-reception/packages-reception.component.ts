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
import { PackagesStateEnum } from "src/app/shared/enums/packages-state-enum";
import { PackagesReceptionService } from "src/app/shared/services/packages-reception.service";
import { DateUtil } from "src/app/shared/utils/date";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-packages-reception",
  templateUrl: "./packages-reception.component.html",
  styleUrls: ["./packages-reception.component.css"],
})
export class PackagesReceptionComponent {
  @ViewChild("searchPackageInput") searchPackageInput: ElementRef;
  @ViewChild("businessPartnerSelect") businessPartnerSelect: ElementRef;
  cols = [];
  rows = [];
  todayPackages = 0;
  lastSevenDaysPackages = [];
  lastSevenDaysPackagesLength = 0;
  businessPartners = [];
  partnerCode;
  mallCode;
  userSession;
  totalPackages;
  packagesToBeReceived = [];
  daysLeft = +environment.daysLeft;
  genericErrorMessage =
    "Ocurrieron errores al cargar la información. Por favor intente más tarde";
  displayReceivedInfo = false;
  partnerSelected;

  constructor(
    private packagesService: PackagesReceptionService,
    private changeDetectorRefs: ChangeDetectorRef,
    private toastr: ToastrService,
    private route: Router,
    private dateUtil: DateUtil
  ) {}

  ngOnInit() {
    this.userSession = JSON.parse(sessionStorage.getItem("res"));
    this.mallCode = this.userSession.mallCode;
    this.getBusinessPartners();
  }

  getBusinessPartners() {
    this.packagesService.getBusinessPartners().subscribe((res) => {
      this.businessPartners = res.map((elem) => elem);
      //set default partnerSelected value
      this.partnerSelected = this.businessPartners[0].id;
    });
  }

  getTodayPackages(mallCode, partnerCode) {
    const todayDate = this.dateUtil.setDate();
    const state = PackagesStateEnum.CREATED;
    this.packagesService
      .getTodayPackages(mallCode, partnerCode, todayDate, state)
      .subscribe(
        (res) => {
          this.todayPackages = res.length;
        },
        (error) => {
          this.searchPackageInput.nativeElement.value = "";
          this.toastr.error(this.genericErrorMessage, "", {
            positionClass: "toast-top-center",
          });
        }
      );
  }

  getLastSevenDaysPackages(mallCode, partnerCode) {
    const todayDate = this.dateUtil.setDate();
    const lastSevenDays = <any>new Date() - 1000 * 60 * 60 * 24 * this.daysLeft;
    const fromDate = this.dateUtil.setDate(lastSevenDays);
    this.packagesService
      .getLastPackages(
        mallCode,
        partnerCode,
        todayDate,
        fromDate,
        PackagesStateEnum.CREATED
      )
      .subscribe(
        (res) => {
          this.totalPackages = res;
          this.lastSevenDaysPackages = res.map((elem) => {
            return elem.packageNumber;
          });
          this.lastSevenDaysPackagesLength = res.length;
          this.changeDetectorRefs.detectChanges();
        },
        (error) => {
          this.searchPackageInput.nativeElement.value = "";
          this.toastr.error(this.genericErrorMessage, "", {
            positionClass: "toast-top-center",
          });
        }
      );
  }

  /* istanbul ignore next */
  getPackageBycode(event) {
    if (event.which === 13 && event.currentTarget.value != "") {
      const packageNumber = event.currentTarget.value;
      const packageIsLoaded = this.checkIfPackageIsLoaded(packageNumber);

      if (packageIsLoaded) {
        this.addPackageToTable(packageNumber, true);
      } else {
        this.packagesService
          .getPackageBycode(this.mallCode, this.partnerCode, packageNumber)
          .subscribe(
            (res) => {
              this.addPackageToTable(packageNumber, true);
            },
            (error) => {
              if (error.status === "404") {
                this.searchPackageInput.nativeElement.value = "";
                this.addPackageToTable(
                  packageNumber,
                  false,
                  "No se recepciona"
                );
              } else {
                this.toastr.error(this.genericErrorMessage, "", {
                  positionClass: "toast-top-center",
                });
              }
            }
          );
      }
    }
  }

  addPackageToTable(number, canBeReceived, observations = "") {
    const newPackage = {
      "Bulto recepcionado": number,
      Observaciones: observations,
      packageNumber: number,
    };
    if (canBeReceived) {
      this.packagesToBeReceived.push(newPackage);
    }
    this.rows.unshift(newPackage);
    this.cols = ["Bulto recepcionado", "Observaciones"];

    this.searchPackageInput.nativeElement.value = "";
    this.changeDetectorRefs.detectChanges();
  }

  /* istanbul ignore next */
  checkIfPackageIsLoaded(number) {
    return this.lastSevenDaysPackages.includes(number);
  }

  getPackagesByBusinessPartner(partnerCode) {
    this.rows = [];
    this.cols = [];
    this.partnerSelected = this.businessPartners.filter(
      (elem) => elem.id === partnerCode
    );
    this.partnerSelected = this.partnerSelected[0].id;
    this.changeDetectorRefs.detectChanges();
    this.partnerCode = partnerCode;
    this.getLastSevenDaysPackages(this.mallCode, partnerCode);
    this.getTodayPackages(this.mallCode, partnerCode);
  }

  savePackages() {
    let packages = this.packagesToBeReceived.map((el) => el.packageNumber);
    this.packagesService
      .savePackages(this.mallCode, this.partnerCode, packages)
      .subscribe(
        (res) => {
          void this.route.navigate(["receivedPackages"]);
        },
        (error) => {
          this.toastr.error(this.genericErrorMessage, "", {
            positionClass: "toast-top-center",
          });
        }
      );
  }

  cancel() {
    this.clearViewValues();
  }

  clearViewValues() {
    this.packagesToBeReceived = [];
    this.cols = [];
    this.rows = [];
    this.searchPackageInput.nativeElement.value = "";
    this.businessPartnerSelect.nativeElement.value = this.businessPartners[0].id;
  }

  shouldDisplayTotalDaysLeftComponent(changeVisibility) {
    this.displayReceivedInfo = changeVisibility;
  }
}
