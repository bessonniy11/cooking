import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResolveEnd, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {AppService} from "../../services/app.service";


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    router: Router,
    private appService: AppService,
  ) {
    router.events.subscribe(event => {
      if (event instanceof ResolveEnd) {
        if (this.appService.errorCode) {
          this.appService.errorCode = null;
        }
      }
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if ((!event.body.status && event.body.message === 'not_found') || event.status === 404) {
            this.appService.errorCode = 404;
          }
          if (event.status === 500) {
            this.appService.errorCode = 500;
          }
        }
        return event;
      })
    );
  }
}
