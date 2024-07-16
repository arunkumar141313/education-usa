import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { ApiUrl } from "../constants/api-url.constant";
import { CacheKey } from "../enums/cache-key.enum";
import { User } from "../interfaces/profile/user.interface";
import { CacheService } from "./cache.service";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private authBaseUrl = ApiUrl.AuthBaseUrl;
  private userBaseUrl = ApiUrl.UserBaseUrl;
  private userInfoSubject = new Subject<User | null>();

  constructor(
    private _http: HttpClient,
    private _cacheService: CacheService
  ) {
  }

  public setUserInfo(userInfo: User | null): void {
    this.userInfoSubject.next(userInfo)
  }

  public getUser(): Observable<User | null> {
    return this.userInfoSubject.asObservable();
  }

  public login(loginData: User): Observable<User> {
    const url = this.authBaseUrl + '/login';
    return this._http.post<User>(url, loginData);
  }

  public logout(): Observable<boolean> {
    const url = this.authBaseUrl + '/logout';
    return this._http.get<boolean>(url);
  }

  public register(registerData: User): Observable<User> {
    const url = this.authBaseUrl + '/register';
    return this._http.post<User>(url, registerData);
  }

  public getUserInfo(): User {
    return this._cacheService.getLocal(CacheKey.USER_INFO);
  }

  public updateUserInfo(user: User, userId: number): Observable<User> {
    const url = this.userBaseUrl + '/' + userId;
    return this._http.put<User>(url, user);
  }

  public setGuestToken(): void {
    const url = this.authBaseUrl + '/guest-token';
    this._http.get<User>(url).subscribe({
      next: (res) => {
        if (res && res.jwt) {
          this._cacheService.setLocal(CacheKey.AUTH_TOKEN, res.jwt);
          this._cacheService.setLocal(CacheKey.USER_INFO, res);
        }
      }
    });;
  }

}
