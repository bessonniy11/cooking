import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CancelHttpService {

  private cancelPendingRequests$ = new Subject<void>();

  constructor() {
  }

  public cancelPendingRequests() {
    this.cancelPendingRequests$.next();
  }

  public onCancelPendingRequests() {
    return this.cancelPendingRequests$.asObservable();
  }
}
