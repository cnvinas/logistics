import { HttpClient, HttpClientModule } from "@angular/common/http";
import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, inject, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { of, throwError } from "rxjs";
import { PackagesStateEnum } from "src/app/shared/enums/packages-state-enum";
import { PackagesReceptionService } from "src/app/shared/services/packages-reception.service";
import { DateUtil } from "src/app/shared/utils/date";
import { PackagesReceptionComponent } from "./packages-reception.component";

xdescribe("PackagesReception", () => {
  let component: PackagesReceptionComponent;
  let packageService: PackagesReceptionService;
  let toasterService: ToastrService;
  let routerService: Router;
  let fixture: ComponentFixture<PackagesReceptionComponent>;

  const RouterSpy = jasmine.createSpyObj("Router", ["navigate"]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PackagesReceptionComponent],
      imports: [HttpClientModule, ToastrModule.forRoot(), RouterTestingModule],
      providers: [
        HttpClient,
        PackagesReceptionService,
        ChangeDetectorRef,
        ToastrService,
        { provide: Router, useValue: RouterSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(inject(
    [PackagesReceptionService, ToastrService, Router],
    (p, t, r) => {
      packageService = p;
      toasterService = t;
      routerService = r;
      spyOn(window.sessionStorage, "getItem").and.returnValue(
        '{ "roles":[ "admin", "runner"],"accesToken":"ey.....", "mallCode":"PEG"}'
      );
      fixture = TestBed.createComponent(PackagesReceptionComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }
  ));

  it("should create PackagesReception component", () => {
    expect(component).toBeTruthy();
  });

  it("should load the businessPartners after getBusinessPartners method is called", () => {
    let businessPartners = component.businessPartners;
    let bp = [
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
    ];
    let packagesService = fixture.debugElement.injector.get(
      PackagesReceptionService
    );
    spyOn(packagesService, "getBusinessPartners").and.callFake(() => of(bp));

    component.getBusinessPartners();
    fixture.detectChanges();

    expect(businessPartners).toEqual(bp);
    expect(packagesService.getBusinessPartners).toHaveBeenCalledTimes(1);
  });

  it("should load todayPackages after getTodayPackages method is called", () => {
    let packages = [
      {
        packageId: "4813393923932160",
        packageNumber: "123456789012346",
        orderId: "5092424393162752",
        size: "S/M/L",
        height: 60.5,
        width: 180.1,
        depth: 60.3,
        weight: 100,
        description: "Items in package",
      },
    ];
    let mallCode = "PNO";
    let partnerCode = "1";
    let todayDate = DateUtil.prototype.setDate();
    let status = PackagesStateEnum.CREATED;

    spyOn(packageService, "getTodayPackages").and.returnValue(of(packages));

    component.getTodayPackages(mallCode, partnerCode);

    fixture.detectChanges();

    expect(packageService.getTodayPackages).toHaveBeenCalledWith(
      mallCode,
      partnerCode,
      todayDate,
      status
    );
    expect(component.todayPackages).toEqual(packages.length);
  });

  it("should handle error of getLastPackages service after getLastSevenDaysPackages method is called", () => {
    let mallCode = "PNO";
    let partnerCode = "1";
    let todayDate = DateUtil.prototype.setDate();
    let lastSevenDays =
      <any>new Date() - 1000 * 60 * 60 * 24 * component.daysLeft;
    let fromDate = DateUtil.prototype.setDate(lastSevenDays);
    let status = PackagesStateEnum.CREATED;

    spyOn(packageService, "getLastPackages").and.callFake(() => {
      return throwError(new Error("error"));
    });

    component.getLastSevenDaysPackages(mallCode, partnerCode);
    fixture.detectChanges();

    expect(packageService.getLastPackages).toHaveBeenCalledWith(
      mallCode,
      partnerCode,
      todayDate,
      fromDate,
      status
    );
    expect(component.searchPackageInput.nativeElement.value).toEqual("");
  });

  it("should redirect to receivedPackages after savePackages method is called", () => {
    component.mallCode = "PNO";
    component.partnerCode = "1";
    component.packagesToBeReceived = [
      { packageNumber: "123456789" },
      { packageNumber: "987654321" },
    ];
    let packages = component.packagesToBeReceived.map((el) => el.packageNumber);
    spyOn(packageService, "savePackages").and.returnValue(of(true));
    component.savePackages();
    fixture.detectChanges();

    expect(packageService.savePackages).toHaveBeenCalledWith(
      component.mallCode,
      component.partnerCode,
      packages
    );
    expect(routerService.navigate).toHaveBeenCalledWith(["receivedPackages"]);
  });

  it("should handle error of savePackages service after savePackages method is called", () => {
    component.mallCode = "PNO";
    component.partnerCode = "1";
    component.packagesToBeReceived = [
      { packageNumber: "123456789" },
      { packageNumber: "987654321" },
    ];
    let packages = component.packagesToBeReceived.map((el) => el.packageNumber);

    spyOn(packageService, "savePackages").and.callFake(() => {
      return throwError(new Error("error"));
    });
    spyOn(toasterService, "error");
    component.savePackages();

    fixture.detectChanges();
    expect(packageService.savePackages).toHaveBeenCalledWith(
      component.mallCode,
      component.partnerCode,
      packages
    );
    expect(toasterService.error).toHaveBeenCalled();
  });

  it("should load the totalPackages, LastSevenDaysPackages and LastSevenDaysPackagesLength after getLastSevenDaysPackages method is called", () => {
    let packages = [
      {
        packageId: "4813393923932160",
        packageNumber: "123456789012346",
        orderId: "5092424393162752",
        size: "S/M/L",
        height: 60.5,
        width: 180.1,
        depth: 60.3,
        weight: 100,
        description: "Items in package",
      },
    ];
    let mallCode = "PNO";
    let partnerCode = "1";
    let todayDate = DateUtil.prototype.setDate();
    let lastSevenDays =
      <any>new Date() - 1000 * 60 * 60 * 24 * component.daysLeft;
    let fromDate = DateUtil.prototype.setDate(lastSevenDays);
    let status = PackagesStateEnum.CREATED;
    spyOn(packageService, "getLastPackages").and.returnValue(of(packages));

    component.getLastSevenDaysPackages(mallCode, partnerCode);

    fixture.detectChanges();

    expect(packageService.getLastPackages).toHaveBeenCalledWith(
      mallCode,
      partnerCode,
      todayDate,
      fromDate,
      status
    );
    expect(component.totalPackages).toEqual(packages);
    expect(component.lastSevenDaysPackages[0]).toEqual(
      packages[0].packageNumber
    );
    expect(component.lastSevenDaysPackagesLength).toEqual(packages.length);
  });

  it("should handle error of getLastPackages service after getLastSevenDaysPackages method is called", () => {
    let mallCode = "PNO";
    let partnerCode = "1";
    let todayDate = DateUtil.prototype.setDate();
    let lastSevenDays =
      <any>new Date() - 1000 * 60 * 60 * 24 * component.daysLeft;
    let fromDate = DateUtil.prototype.setDate(lastSevenDays);
    let status = PackagesStateEnum.CREATED;
    spyOn(packageService, "getLastPackages").and.callFake(() => {
      return throwError(new Error("error"));
    });
    spyOn(toasterService, "error");
    component.getLastSevenDaysPackages(mallCode, partnerCode);

    fixture.detectChanges();

    expect(packageService.getLastPackages).toHaveBeenCalledWith(
      mallCode,
      partnerCode,
      todayDate,
      fromDate,
      status
    );
    expect(toasterService.error).toHaveBeenCalled();
  });

  it("should update packagesToBeReceived after addPackageToTable method is called", () => {
    component.packagesToBeReceived = [];
    let number = "123456789";
    let canBeReceived = true;
    let observations = "";
    component.addPackageToTable(number, canBeReceived, observations);
    expect(component.packagesToBeReceived.length).toEqual(1);
  });

  it("should update partnerCode after getPackagesByBusinessPartner method is called", () => {
    component.packagesToBeReceived = [];
    let mallCode = "PEG";
    let packageCode = "1";
    component.getPackagesByBusinessPartner(packageCode);
    let spyOnlastSevenDays = spyOn(component, "getLastSevenDaysPackages");
    let spyOnTodayPackages = spyOn(component, "getTodayPackages");

    spyOnlastSevenDays(mallCode, packageCode);
    spyOnTodayPackages(mallCode, packageCode);
    expect(component.partnerCode).toEqual(packageCode);
    expect(spyOnlastSevenDays).toHaveBeenCalled();
  });
});
