/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OrdersService } from "src/app/shared/services/orders.service";

@Component({
  selector: "app-orders-list",
  templateUrl: "./orders-list.component.html",
  styleUrls: ["./orders-list.component.css"],
})
export class OrdersListComponent implements OnInit {
  title = "Listado de órdenes";
  loading = true;
  mall;
  showLoadMoreButton = false;
  listOfOrders = [];
  subsetOfOrders = [];
  loadMoreData;
  constructor(
    private service: OrdersService,
    private routeSnapshot: ActivatedRoute
  ) {}

  ngOnInit() {
    this.mall = this.routeSnapshot.snapshot.params.mall;
    this.getOrdersList();
  }

  //to do services
  getOrdersList() {
    let userData = JSON.parse(window.sessionStorage.getItem("res"));

    this.service.getOrdersList(userData.mallCode).subscribe(
      (res) => {
        this.listOfOrders = res.map((order) => {
          return {
            orderNumber: order.orderNumber,
            sellerBrand: order.sellerBrand,
            notificationDatetime: order.notificationDatetime,
            items: order.items.map((elem) => {
              return elem;
            }),
          };
        });
        this.subsetOfOrders = this.listOfOrders.slice(0, 20);
        this.loading = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onScroll() {
    this.showLoadMoreButton = true;
  }

  loadMoreOrdersOnClick() {
    this.loading = true;
    this.loadMoreData = this.listOfOrders.slice(
      this.subsetOfOrders.length,
      this.subsetOfOrders.length + 20
    );
    this.subsetOfOrders = [].concat(this.subsetOfOrders, this.loadMoreData);
    this.showLoadMoreButton = false;
    this.loading = false;
  }
}
