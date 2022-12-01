import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import {NavigationService} from "./navigation.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  protected baseUrl = environment.baseUrl;
  protected apiUrl = environment.apiUrl;
  protected newApiUrl = environment.newApiUrl;
  loading = false;

  user: any = null;

  constructor(private http: HttpClient, private navigationService: NavigationService) { }

  postRequest(data: any, callback: any | undefined) {
    this.loading = true;
    this.http.post(this.baseUrl + data.link, { data: data }).subscribe(res => {
      if (res) {

        // console.log('res postRequest', res);
        this.loading = false;
      }
      return callback(res)
    });
  }

  getRequest(data: any, callback: any | undefined) {

    this.http.get(this.baseUrl + data.link).subscribe(res => {

      if (res) {
        console.log('res getRequest', res);
        this.loading = false;
      }

      return callback(res)
    });
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.navigationService.goToUrl('login');
  }

  // public isLogin() {
  //   return this.user?.id?.toString() !== '0';
  // }

}
