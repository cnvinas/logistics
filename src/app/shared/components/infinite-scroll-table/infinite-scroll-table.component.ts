/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "infinite-scroll-table",
  templateUrl: "./infinite-scroll-table.html",
  styleUrls: ["./infinite-scroll-table.css"],
})
export class InfiniteScrollTableComponent implements OnInit {
  loading = true;
  showLoadMoreButton = false;
  loadMoreData = [];
  fullList = [];
  subsetOfData = [];
  @Input() cols = [];
  @Input() rows = [];

  ngOnInit() {
    this.loadMoreOrders();
  }

  onScroll() {
    this.showLoadMoreButton = true;
  }

  loadMoreOrders() {
    this.loading = true;
    this.loadMoreData = this.rows.slice(
      this.subsetOfData.length,
      this.subsetOfData.length + 20
    );
    this.subsetOfData = [].concat(this.subsetOfData, this.loadMoreData);
    this.showLoadMoreButton = false;
    this.loading = false;
  }
}
