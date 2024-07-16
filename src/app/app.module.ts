import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxEditorModule } from 'ngx-editor';
import { AuthTokenInterceptor } from './core-module/interceptors/auth-token.interceptor';
import { CoreModule } from './core-module/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { UnAuthorizedComponent } from './components/un-authorized/un-authorized.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UnAuthorizedInterceptor } from './core-module/interceptors/un-authorized.interceptor';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ShellComponent } from './components/shell/shell.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    UnAuthorizedComponent,
    PageNotFoundComponent,
    NavBarComponent,
    ShellComponent,
    HomeComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxEditorModule.forRoot(),
    CoreModule,
    ToastrModule.forRoot(),
    ScrollToModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, multi: true, useClass: AuthTokenInterceptor
    },
    {
      provide: HTTP_INTERCEPTORS, multi: true, useClass: UnAuthorizedInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
