import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'dateTimeZonePipe'
})

export class DateTimeZonePipe implements PipeTransform {
  constructor(private _datePipe: DatePipe) { }
  transform(value: string | number | Date | undefined, format: string = 'medium', timeZoneOffset: string = '+0530') {
    if (value) {
      return this._datePipe.transform(value, format, timeZoneOffset);
    }
    return '';
  }
}
