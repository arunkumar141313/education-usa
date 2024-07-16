import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UnAuthorizedInterceptor implements HttpInterceptor {

  constructor(
    private _router: Router
  ) { }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401 || err.status === 403) {
      this._router.navigateByUrl(`/un-authorized`);
      return of(err.message);
    }
    return throwError(err);
  }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.includes("login")) {
      return next.handle(request).pipe(catchError(x => this.handleAuthError(x)));
    }
    return next.handle(request);
  }
}
