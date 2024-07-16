import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiUrl } from "../constants/api-url.constant";
import { CountryEnum } from "../enums/country.enum";
import { State } from "../interfaces/geography/state.interface";

@Injectable({
  providedIn: 'root'
})

export class StateService {

  private stateBaseUrl = ApiUrl.State;

  constructor(private _http: HttpClient) { }

  getStatesByCountryId(countryId: CountryEnum): Observable<State[]> {
    const url = this.stateBaseUrl + '/country/' + countryId;
    return this._http.get<State[]>(url);
  }
}
