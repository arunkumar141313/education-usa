import { Component, OnInit } from '@angular/core';
import { CacheKey } from 'src/app/core-module/enums/cache-key.enum';
import { User } from 'src/app/core-module/interfaces/profile/user.interface';
import { CacheService } from 'src/app/core-module/services/cache.service';

@Component({
  selector: 'app-un-authorized',
  templateUrl: './un-authorized.component.html',
  styleUrls: ['./un-authorized.component.scss']
})

export class UnAuthorizedComponent implements OnInit {

  constructor(
    private _cacheService: CacheService
  ) { }

  ngOnInit(): void {
  }

  clearAuthDetails(): void {
    if (this._cacheService.getLocal(CacheKey.AUTH_TOKEN)) {
      const userInfo: User = this._cacheService.getLocal(CacheKey.USER_INFO);
      if (userInfo && userInfo.roles && userInfo.roles.find((x) => x.toUpperCase() == 'USER')) {
        this._cacheService.setLocal(CacheKey.AUTH_TOKEN, '');
        this._cacheService.setLocal(CacheKey.USER_INFO, '');
      }
    }
  }

}
