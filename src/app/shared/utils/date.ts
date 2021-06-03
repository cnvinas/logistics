/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DateUtil {
  setDate(date?, ddmmyyyy?) {
    let d = date ? new Date(date) : new Date();
    let month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return ddmmyyyy
      ? [day, month, year].join("-")
      : [year, month, day].join("-");
  }
}
