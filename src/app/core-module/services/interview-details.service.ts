import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiUrl } from "src/app/core-module/constants/api-url.constant";
import { InterviewDetails } from "../interfaces/profile/interview-details.interface";

@Injectable({
  providedIn: 'root'
})

export class InterviewDetailsService {
  private interviewDetailsBaseUrl = ApiUrl.InterviewDetails;

  constructor(private _http: HttpClient) { }

  public getInterviewDetailsByUserId(userId: number): Observable<InterviewDetails[]> {
    const url = this.interviewDetailsBaseUrl + '/users/' + userId + "?rowStatus=1";
    return this._http.get<InterviewDetails[]>(url);
  }

  public addNewInterviewDetails(userId: number, interviewDetails: InterviewDetails): Observable<InterviewDetails> {
    const url = this.interviewDetailsBaseUrl + '/users/' + userId;
    return this._http.post<InterviewDetails>(url, interviewDetails);
  }

  public updateInterviewDetails(userId: number, interviewDetailsId: number, interviewDetails: InterviewDetails): Observable<InterviewDetails> {
    const url = this.interviewDetailsBaseUrl + "/" + interviewDetailsId + "/users/" + userId;
    return this._http.put<InterviewDetails>(url, interviewDetails);
  }

  public deleteInterviewDetails(interviewDetailsId: number): Observable<boolean> {
    const url = this.interviewDetailsBaseUrl + "/" + interviewDetailsId;
    return this._http.delete<boolean>(url);
  }
}
