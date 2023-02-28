import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {UserService} from "../../services/user.service";

@Injectable()
export class HttpErrorFirebaseInterceptor implements HttpInterceptor {

  constructor(
    private userService: UserService,
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const data = {
          userId: this.userService.user?.id?.toString(),
          request: JSON.stringify(request),
          requestUrl: request.url,
          error: JSON.stringify(error),
          status: error.status.toString()
        };
        const err = new Error('HttpErrorInterceptor');
        err.stack = 'Error: HttpErrorInterceptor\n    at intercept.catchError (http-error.interceptor.ts:111:1)';
        return throwError(error);
      })
    );
  }
}
