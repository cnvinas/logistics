import { HttpClient, HttpClientModule } from "@angular/common/http";
import { ComponentFixture, inject, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of, throwError } from "rxjs";
import { OrdersService } from "src/app/shared/services/orders.service";
import { OrdersListComponent } from "./orders-list.component";

xdescribe("OrdersListComponent", () => {
  let component: OrdersListComponent;
  let fixture: ComponentFixture<OrdersListComponent>;
  let service: OrdersService;

  const activatedRouteStub = ({
    snapshot: { params: { mall: "PNO" } },
  } as any) as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdersListComponent],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [
        OrdersService,
        HttpClient,
        {
          provide: ActivatedRoute,
          useValue: activatedRouteStub,
        },
      ],
    }).compileComponents();
  });

  beforeEach(inject([OrdersService], (s) => {
    service = s;
    fixture = TestBed.createComponent(OrdersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create OrdersListComponent", () => {
    expect(component).toBeTruthy();
  });

  it("should load the listOfOrders and subsetOfOrders after getOrdersList method is called", () => {
    let orders = [
      {
        orderId: "23",
        orderNumber: "26",
        sellerBrand: "BOCHIN",
        items: [
          {
            description: "Botines",
            quantity: 2,
          },
          {
            description: "guantes",
            quantity: 1,
          },
        ],
        notificationDatetime: "2021-03-19T15:00:00",
      },
    ];
    const userData = {
      accesToken: "1234",
      mallCode: "PEG",
      roles: ["admin", "runner"],
    };
    sessionStorage.setItem("res", JSON.stringify(userData));

    const loggedUser = JSON.parse(window.sessionStorage.getItem("res"));
    spyOn(service, "getOrdersList").and.returnValue(of(orders));

    component.getOrdersList();
    fixture.detectChanges();

    expect(service.getOrdersList).toHaveBeenCalledWith(loggedUser.mallCode);
    expect(component.listOfOrders[0].orderNumber).toEqual(
      orders[0].orderNumber
    );
    expect(component.listOfOrders[0].sellerBrand).toEqual(
      orders[0].sellerBrand
    );
    expect(component.listOfOrders[0].notificationDatetime).toEqual(
      orders[0].notificationDatetime
    );
    expect(component.listOfOrders[0].items.length).toEqual(
      orders[0].items.length
    );
    expect(service.getOrdersList).toHaveBeenCalledTimes(1);
  });

  it("should throw error after getOrdersList method is called", () => {
    const userData = {
      accesToken: "1234",
      mallCode: "PEG",
      roles: ["admin", "runner"],
    };
    sessionStorage.setItem("res", JSON.stringify(userData));

    const loggedUser = JSON.parse(window.sessionStorage.getItem("res"));
    spyOn(service, "getOrdersList").and.callFake(() => {
      return throwError(new Error("error"));
    });
    component.getOrdersList();
    fixture.detectChanges();

    expect(component.listOfOrders).toEqual([]);
    expect(service.getOrdersList).toHaveBeenCalledTimes(1);
    expect(service.getOrdersList).toHaveBeenCalledWith(loggedUser.mallCode);
  });

  it("should load showLoadMoreButton on OnScroll Method call", () => {
    component.onScroll();

    expect(component.loadMoreOrdersOnClick).toBeTruthy();
  });

  it("should load loadMoreData and subsetOfOrders on loadMoreOrdersOnClick Method call", () => {
    component.loadMoreOrdersOnClick();
    expect(component.loadMoreData.length).toBeGreaterThan(-1);
    expect(component.subsetOfOrders.length).toBeGreaterThan(-1);
  });
});
