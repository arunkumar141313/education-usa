import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CheckList } from "../interfaces/visa-check-list/check-list.interface";

@Injectable({
  providedIn: 'root'
})

export class VisaCheckListService {

  constructor(private _http: HttpClient) { }

  getVisaCheckListData(): Observable<CheckList[]> {
    const url = environment.assetsBaseUrl + "/json/visa-check-list.json";
    return this._http.get<CheckList[]>(url);
  }
}
