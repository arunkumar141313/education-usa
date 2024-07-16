import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from "rxjs";
import { CacheService } from "../services/cache.service";
import { CacheKey } from "../enums/cache-key.enum";

@Injectable({
  providedIn: 'root'
})

export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(public _cacheService: CacheService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this._cacheService.getLocal(CacheKey.AUTH_TOKEN) && !req.url.includes('.amazonaws.com')) {
      let httpHeaders = new HttpHeaders();
      const bearerToken = 'Bearer ' + this._cacheService.getLocal(CacheKey.AUTH_TOKEN);
      httpHeaders = httpHeaders.append('Authorization', bearerToken);
      req = req.clone({ headers: httpHeaders });
    }
    return next.handle(req);
  }
}
