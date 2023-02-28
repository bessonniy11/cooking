import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {CancelHttpService} from "../../services/cancel.http.service";


@Injectable()
export class CancelHttpInterceptor implements HttpInterceptor {

  constructor(
    private http: CancelHttpService,
  ) {
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.params.get('search')) {

      console.log('CancelHttpInterceptor');

      return next.handle(request).pipe(takeUntil(this.http.onCancelPendingRequests()));
    } else {
      return next.handle(request);
    }
  }
}
