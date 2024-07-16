import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiUrl } from "../constants/api-url.constant";
import { Embassy } from "../interfaces/geography/embassy.interface";

@Injectable({
  providedIn: 'root'
})

export class EmbassyService {
  private embassyBaseUrl = ApiUrl.Embassy;

  constructor(private _http: HttpClient) { }

  public getEmbassies(countryId: number): Observable<Embassy[]> {
    const url = this.embassyBaseUrl + "/country/" + countryId;
    return this._http.get<Embassy[]>(url);
  }

}
