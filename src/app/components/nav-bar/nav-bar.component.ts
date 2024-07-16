import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CacheKey } from 'src/app/core-module/enums/cache-key.enum';
import { User } from 'src/app/core-module/interfaces/profile/user.interface';
import { AuthService } from 'src/app/core-module/services/auth.service';
import { CacheService } from 'src/app/core-module/services/cache.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent implements OnInit {

  userInfo!: User;
  isLoggedIn: boolean = false;
  userInfoSubscription!: Subscription;
  constructor(
    private _authService: AuthService,
    private _cacheService: CacheService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.subscribeUserInfo();
    this.processUserInfo();
  }

  processUserInfo(): void {
    this.userInfo = this._authService.getUserInfo();
    if (this.userInfo && this.userInfo.roles && this.userInfo.roles.find((x) => x.toUpperCase() === 'USER')) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  subscribeUserInfo(): void {
    this.userInfoSubscription = this._authService.getUser().subscribe({
      next: () => {
        this.processUserInfo();
      }
    })
  }

  logout(): void {
    this._authService.logout().subscribe({
      complete: () => {
        this._cacheService.setLocal(CacheKey.AUTH_TOKEN, '');
        this._cacheService.setLocal(CacheKey.USER_INFO, '');
        this._authService.setUserInfo(null);
        this._router.navigate(['/']);
        this._authService.setGuestToken();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userInfoSubscription) {
      this.userInfoSubscription.unsubscribe();
    }
  }
}
