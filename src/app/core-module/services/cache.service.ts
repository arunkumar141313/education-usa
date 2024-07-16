import { Injectable } from "@angular/core";
import { CacheKey } from "../enums/cache-key.enum";

@Injectable({
  providedIn: 'root'
})

export class CacheService {

  public getLocal(key: CacheKey): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  public setLocal(key: CacheKey, value: string | Object): void {
    let stringData: string;
    stringData = JSON.stringify(value);
    localStorage.setItem(key, stringData);
  }

  public getSession(key: CacheKey): string | null {
    return sessionStorage.getItem(key);
  }

  public setSession(key: CacheKey, value: string): void {
    sessionStorage.setItem(key, value);
  }

}
