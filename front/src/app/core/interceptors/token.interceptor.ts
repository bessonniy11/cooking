import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AppService} from "../../services/app.service";
import {environment} from "../../../environments/environment";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private appService: AppService,
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url.includes(environment.baseUrl) && !request.url.includes('.json')) {
      if (this.appService.getToken()) {
        request = request.clone({
          setHeaders: {
            Authorization: 'Bearer ' + this.appService.getToken(),
          }
        });
      }

      request = request.clone({
        setHeaders: {
          'accept-language': 'ru',
        }
      });
    }

    return next.handle(request);
  }

}
