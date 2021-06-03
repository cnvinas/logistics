import { Component, Input } from "@angular/core";

@Component({
  selector: "main-table",
  templateUrl: "./main-table.html",
  styleUrls: ["./main-table.css"],
})
export class MainTableComponent {
  @Input() cols = [];
  @Input() rows = [];
}
