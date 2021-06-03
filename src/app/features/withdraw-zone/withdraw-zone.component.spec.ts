import { HttpClient, HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, inject, TestBed } from "@angular/core/testing";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { of, throwError } from "rxjs";
import { PackagesStateEnum } from "src/app/shared/enums/packages-state-enum";
import { PackagesReceptionService } from "src/app/shared/services/packages-reception.service";
import { DateUtil } from "src/app/shared/utils/date";

import { WithdrawZoneComponent } from "./withdraw-zone.component";

describe("WithdrawZoneComponent", () => {
  let component: WithdrawZoneComponent;
  let fixture: ComponentFixture<WithdrawZoneComponent>;
  let packageService: PackagesReceptionService;
  let toastrService: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WithdrawZoneComponent],
      imports: [HttpClientModule, ToastrModule.forRoot()],
      providers: [PackagesReceptionService, ToastrService, HttpClient],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(inject([PackagesReceptionService, ToastrService], (p, t, d) => {
    packageService = p;
    toastrService = t;
    spyOn(window.sessionStorage, "getItem").and.returnValue(
      '{ "roles":[ "admin", "runner"],"accesToken":"ey.....", "mallCode":"PEG"}'
    );
    fixture = TestBed.createComponent(WithdrawZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should load table rows after getReceivedPackages method is called", () => {
    let packages = [
      {
        packageNumber: "123456789012346",
        booking: {
          openingCode: "123456",
        },
        zone: {
          id: "mp001",
          type: "LOCKER",
          description: "Locker 1",
        },
      },
    ];
    let mallCode = "PEG";
    let partnerCode = "1";
    let todayDate = DateUtil.prototype.setDate();
    let status = PackagesStateEnum.RECEIVED;

    spyOn(packageService, "getLastPackages").and.returnValue(of(packages));
    fixture.detectChanges();

    component.getReceivedPackages(partnerCode);

    console.log(component.mallCode);

    expect(packageService.getLastPackages).toHaveBeenCalledWith(
      mallCode,
      partnerCode,
      todayDate,
      null,
      status
    );
    expect(component.rows.length).toEqual(packages.length);
  });

  it("should show toast error after packagesService throws an error", () => {
    let mallCode = "PEG";
    let partnerCode = "1";
    let todayDate = DateUtil.prototype.setDate();
    let status = PackagesStateEnum.RECEIVED;
    spyOn(packageService, "getLastPackages").and.callFake(() => {
      return throwError(new Error("500"));
    });
    spyOn(toastrService, "error");

    component.getReceivedPackages("1");

    fixture.detectChanges();

    expect(packageService.getLastPackages).toHaveBeenCalledWith(
      mallCode,
      partnerCode,
      todayDate,
      null,
      status
    );
    expect(toastrService.error).toHaveBeenCalled();
  });
});
