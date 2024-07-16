import { Injectable } from "@angular/core";
import { DateFormatConstant, TimeZones } from "../constants/date-time.constant";
import { SortTypeConstant } from "../constants/sort-type.const";
import * as momentTZ from 'moment-timezone';
import * as moment from "moment";
import { Validators } from "@angular/forms";
import { FieldNameEnum } from "../enums/field-name.enum";
import { ToastrService } from "ngx-toastr";
import { ScrollToService } from "@nicky-lenaers/ngx-scroll-to";
import { InterviewDetails } from "../interfaces/profile/interview-details.interface";
import { InterviewTypeEnum, InterviewStatusEnum } from "../enums/lookup-configuration.enum";
import { SeoMetaData } from "../interfaces/seo-meta-data/seo-meta-data.interface";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})

export class UtilService {

  private seoMetaDataSubject: SeoMetaData[] = [];

  constructor(
    private _toastr: ToastrService,
    private _scrollToService: ScrollToService,
    private _http: HttpClient
  ) { }

  getSeoMetaData(): Observable<SeoMetaData[]> {
    if (this.seoMetaDataSubject && this.seoMetaDataSubject.length) {
      return of(this.seoMetaDataSubject);
    } else {
      return this._http.get<SeoMetaData[]>(environment.assetsBaseUrl + "/json/seo-meta-data.json");
    }
  }

  setSeoMetaData(seoMetaData: SeoMetaData[]): void {
    this.seoMetaDataSubject = seoMetaData;
  }

  public sortByDate(data: any[], key: string, sort: SortTypeConstant = SortTypeConstant.DESC): void {
    if (data && data.length && key) {
      data.sort((a, b) => {
        if (sort == SortTypeConstant.DESC) {
          return new Date(b[key]).getTime() - new Date(a[key]).getTime();
        }
        return new Date(a[key]).getTime() - new Date(b[key]).getTime();
      });
    }
  }

  public localDateToUtcWithTimeZone(date: Date | string, timeZone: string = TimeZones.ASIA_KOLKATA): string {
    return momentTZ.tz(date, timeZone).utc().format();
  }

  public utcToLocalDateWithTimeZone(date: Date | string, timeZone: string = TimeZones.ASIA_KOLKATA): string {
    return momentTZ.tz(date, timeZone).format(DateFormatConstant.yyyy_MM_DD_T_HH_mm_ss);
  }

  public isCurrentDateGreaterTo(utcDate: Date | string): boolean {
    const currentDate = moment.tz(TimeZones.ASIA_KOLKATA).format(DateFormatConstant.yyyy_MM_DD);
    const incomingDate = momentTZ.tz(utcDate, TimeZones.ASIA_KOLKATA).format(DateFormatConstant.yyyy_MM_DD);
    return moment(currentDate).isAfter(incomingDate);
  }

  public hideFindPartnersButton(interviewDetails: InterviewDetails[]): void {
    interviewDetails.forEach((i) => {
      if (this.isCurrentDateGreaterTo(i.interviewDate)) {
        i.hideFindPartnerButton = true;
        return;
      }
      if (i.interviewType == InterviewTypeEnum.BIOMETRIC &&
        i.interviewStatus == InterviewStatusEnum.BIOMETRICS_COMPLETED) {
        i.hideFindPartnerButton = true;
        return;
      }
      if (i.interviewType == InterviewTypeEnum.VISA_INTERVIEW && (
        i.interviewStatus == InterviewStatusEnum.APPROVED ||
        i.interviewStatus == InterviewStatusEnum.REJECTED ||
        i.interviewStatus == InterviewStatusEnum.ADMINISTRATIVE_PROCESSING)) {
        i.hideFindPartnerButton = true;
        return;
      }
    });
  }

  public toastSomethingWentWrong(): void {
    this._toastr.error("Something went wrong, please try again.");
  }

  public toastValidateInputFields(): void {
    this._toastr.error("Validate the input fields.");
  }

  public getValidators(fieldName: FieldNameEnum, required: boolean = true): Validators[] {
    let validators: Validators[] = [];
    if (required) {
      validators.push(Validators.required);
    }

    switch (fieldName) {

      case FieldNameEnum.FIRST_NAME:
      case FieldNameEnum.LAST_NAME:
      case FieldNameEnum.NICK_NAME:
        validators.push(Validators.minLength(2), Validators.maxLength(45));
        break;

      case FieldNameEnum.EMAIL:
        validators.push(Validators.email, Validators.maxLength(100));
        break;

      case FieldNameEnum.PHONE_NUMBER:
        validators.push(Validators.minLength(10), Validators.maxLength(15));
        break;

      case FieldNameEnum.PASSWORD:
        validators.push(Validators.minLength(6), Validators.maxLength(45));
        break;

      case FieldNameEnum.COMMENTS:
      case FieldNameEnum.UNIVERSITY_NAME:
      case FieldNameEnum.MAJOR:
        validators.push(Validators.maxLength(255));
        break;
      case FieldNameEnum.YEAR:
        validators.push(Validators.min(1900), Validators.max(9999));
        break;
    }
    return validators;
  }

  public scrollTo(elementId: string): void {
    this._scrollToService.scrollTo({ target: elementId });
  }


}
