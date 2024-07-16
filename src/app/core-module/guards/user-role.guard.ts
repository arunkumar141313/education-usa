import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CacheKey } from '../enums/cache-key.enum';
import { User } from '../interfaces/profile/user.interface';
import { CacheService } from '../services/cache.service';

@Injectable({
  providedIn: 'root'
})

export class UserRoleGuard implements CanActivate {
  constructor(
    private _cacheService: CacheService,
    private _router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this._cacheService.getLocal(CacheKey.AUTH_TOKEN)) {
      const userInfo: User = this._cacheService.getLocal(CacheKey.USER_INFO);
      if (userInfo && userInfo.roles && userInfo.roles.find((x) => x.toUpperCase() == 'USER')) {
        return true;
      } else if ((route.url.toString().includes('find-my-partner') || route.url.toString().includes('interview-details')) && userInfo && userInfo.roles && userInfo.roles.find((x) => x.toUpperCase() == 'GUEST')) {
        return this._router.navigateByUrl("/my-account/login");
      }
    } else {
      return this._router.navigateByUrl("/my-account/login");
    }
    return this._router.navigateByUrl("/un-authorized");
  }

}
