import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrl } from '../constants/api-url.constant';
import { InterviewTravelPartner } from '../interfaces/interview-travel-partner.interface';

@Injectable({
  providedIn: 'root'
})

export class InterviewTravelPartnerService {
  private interviewTravelBaseUrl = ApiUrl.InterviewTravelPartner;

  constructor(
    private _http: HttpClient
  ) { }

  public addInterviewTravelPartner(userId: number, interviewDetailsId: number, interviewTravelPartner: InterviewTravelPartner): Observable<InterviewTravelPartner> {
    const url = this.interviewTravelBaseUrl + '/users/' + userId + '/interview-details/' + interviewDetailsId;
    return this._http.post<InterviewTravelPartner>(url, interviewTravelPartner);
  }

  public getAllInterviewTravelPartnerPreferencesByUserId(userId: number): Observable<InterviewTravelPartner[]> {
    const url = this.interviewTravelBaseUrl + '/users/' + userId;
    return this._http.get<InterviewTravelPartner[]>(url);
  }

  public changePartnerPreference(interviewTravelPartnerId: number, key: string, value: string): Observable<boolean> {
    const url = this.interviewTravelBaseUrl + '/' + interviewTravelPartnerId + '/change-partner-preference?' + key + "=" + value;
    return this._http.put<boolean>(url, null);
  }

  public deleteInterviewTravelPartner(interviewTravelPartnerId: number | undefined): Observable<boolean> {
    const url = this.interviewTravelBaseUrl + "/" + interviewTravelPartnerId;
    return this._http.delete<boolean>(url);
  }

  public updateInterviewTravelPartner(userId: number, interviewTravelPartnerId: number | undefined, interviewDetailsId: number, interviewTravelPartner: InterviewTravelPartner): Observable<InterviewTravelPartner> {
    const url = this.interviewTravelBaseUrl + "/" + interviewTravelPartnerId + '/users/' + userId + '/interview-details/' + interviewDetailsId;
    return this._http.put<InterviewTravelPartner>(url, interviewTravelPartner);
  }

  public findPartnersForInterviewTravel(interviewTravelPartnerId: number | undefined, userId: number): Observable<InterviewTravelPartner[]> {
    const url = this.interviewTravelBaseUrl + "/" + interviewTravelPartnerId + "/users/" + userId;
    return this._http.get<InterviewTravelPartner[]>(url);
  }

}
