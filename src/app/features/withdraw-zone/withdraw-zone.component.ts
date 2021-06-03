import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { PackagesStateEnum } from "src/app/shared/enums/packages-state-enum";
import { PackagesReceptionService } from "src/app/shared/services/packages-reception.service";
import { DateUtil } from "src/app/shared/utils/date";

@Component({
  selector: "app-withdraw-zone",
  templateUrl: "./withdraw-zone.component.html",
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ["./withdraw-zone.component.css"],
})
export class WithdrawZoneComponent implements OnInit {
  @Input() partnerSelected;
  @Input() todayPackages;
  @Input() lastSevenDaysPackagesLength;
  cols = ["ID de Paquete", "Punto de Retiro", "Código de Apertura"];
  rows = [];
  mallCode;
  partnerCode;
  userSession;
  businessPartners;
  currentDate;
  showTable = false;

  constructor(
    private packagesService: PackagesReceptionService,
    private toastr: ToastrService,
    private date: DateUtil,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userSession = JSON.parse(sessionStorage.getItem("res"));
    this.mallCode = this.userSession.mallCode;
    this.currentDate = this.date.setDate(null, true);
    this.getReceivedPackages(this.partnerSelected);
  }

  ngOnChanges() {
    this.getReceivedPackages(this.partnerSelected);
  }

  getReceivedPackages(pc = "0") {
    this.showTable = false;
    this.changeDetector.detectChanges();
    const todayDate = this.date.setDate();
    const partnerCode = pc;
    this.packagesService
      .getLastPackages(
        this.mallCode,
        partnerCode,
        todayDate,
        null,
        PackagesStateEnum.RECEIVED
      )
      .subscribe(
        (res) => {
          const orderedElements = this.orderElementsByBookingZoneType(res);
          this.rows = orderedElements.map((el) => {
            return {
              "ID de Paquete": el.packageNumber,
              "Punto de Retiro": el.zone.type,
              "Código de Apertura": el.booking.openingCode,
            };
          });
          this.showTable = true;
        },
        (err) => {
          this.toastr.error(
            "Ocurrieron errores al solicitar los datos. Por favor intente nuevamente"
          );
        }
      );
  }

  /* istanbul ignore next */
  orderElementsByBookingZoneType(list) {
    const cleveron = list.filter(
      (el) => el.zone.type.toLowerCase() === "cleveron"
    );
    const locker = list.filter((el) => el.zone.type.toLowerCase() === "locker");
    const backroom = list.filter(
      (el) => el.zone.type.toLowerCase() === "backroom"
    );
    return [].concat(locker, cleveron, backroom);
  }
}
