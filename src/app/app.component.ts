import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CacheKey } from './core-module/enums/cache-key.enum';
import { User } from './core-module/interfaces/profile/user.interface';
import { SeoMetaData } from './core-module/interfaces/seo-meta-data/seo-meta-data.interface';
import { AuthService } from './core-module/services/auth.service';
import { CacheService } from './core-module/services/cache.service';
import { UtilService } from './core-module/services/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent implements OnInit {
  title = 'Education In USA';
  userInfo!: User;

  constructor(
    private _authService: AuthService,
    private _cacheService: CacheService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private meta: Meta,
    private _utilService: UtilService
  ) {
  }

  ngOnInit(): void {
    this.userInfo = this._authService.getUserInfo();
    if (!this._cacheService.getLocal(CacheKey.AUTH_TOKEN)) {
      this._authService.setGuestToken();
    }
    if (environment.gtagEnable) {

    }
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        this.setSeoMetaData(url);
      }
    });
  }

  private loadGoogleAnalytics(url: string): void {

    const script = document.createElement('script');
    script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-5P3Q2SJ');`;
    document?.head?.appendChild(script);

    let gaScript = document.createElement('script');
    gaScript.setAttribute('async', 'true');
    gaScript.setAttribute('src', `https://www.googletagmanager.com/gtag/js?id=${environment.gaId}`);

    let gaScript2 = document.createElement('script');
    gaScript2.innerText = `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag(\'js\', new Date());gtag(\'config\', \'${environment.gaId}\');`;

    document?.documentElement?.firstChild?.appendChild(gaScript);
    document?.documentElement?.firstChild?.appendChild(gaScript2);

    (<any>window).gtag('config', environment.gaId, {
      'page_title': this.titleService.getTitle() || environment.appTitle,
      'page_path': url
    });
  }

  private setSeoMetaData(url: string): void {
    let seoMetaData: SeoMetaData | null | undefined = null;
    this._utilService.getSeoMetaData().subscribe({
      next: (res) => {
        if (res && res.length) {
          this._utilService.setSeoMetaData(res);
          const seoMetaData = res.find((x) => x.pageUrls.indexOf(url) > -1);
          if (seoMetaData) {
            this.titleService.setTitle(seoMetaData.title);
            this.meta.addTags([
              { name: 'title', content: seoMetaData.title },
              { name: 'description', content: seoMetaData.description },
              { name: 'keywords', content: seoMetaData.keywords?.join(",") },
              { name: 'url', content: seoMetaData.url },
              { name: 'image', content: seoMetaData.image },
            ]);

            if (seoMetaData.og && seoMetaData.og.length) {
              this.meta.addTag({ property: 'og:title', content: seoMetaData?.title });
              this.meta.addTag({ property: 'og:description', content: seoMetaData?.title });
              this.meta.addTag({ property: 'og:url', content: seoMetaData?.url });

              seoMetaData.og.forEach((og) => {
                this.meta.addTag({ property: 'og:type', content: og.type });
                this.meta.addTag({ property: 'og:' + og.type + ":url", content: og.url });
                this.meta.addTag({ property: 'og:' + og.type + ":width", content: og.width });
                this.meta.addTag({ property: 'og:' + og.type + ":height", content: og.height });
                this.meta.addTag({ property: 'og:' + og.type + ":alt", content: og.alt });
              });

            }
          } else {
            this.titleService.setTitle(environment.appTitle);
          }
        }
      },
      complete: () => {
        if (environment.gtagEnable) {
          this.loadGoogleAnalytics(url);
        }
      }
    });
  }

}
