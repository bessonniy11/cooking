import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import {NavigationService} from "./navigation.service";
import {MainService} from "../core/main.service";
import {AlertController, LoadingController} from "@ionic/angular";
import {AppService} from "./app.service";

@Injectable({
  providedIn: 'root'
})
export class UserService extends MainService {
  user: any = null;

  constructor(
    http: HttpClient,
    alert: AlertController,
    loader: LoadingController,
    appService: AppService,
    navigationService: NavigationService
  ) {
    super(http, alert, loader, appService, navigationService);
  }


  // получение базовых данных юзера
  public getUser(callback: (status: boolean) => any, force = true) {
    this.appService.loading = true;

    const data = {
      id: localStorage.getItem('userId'),
      link: 'user'
    };

    this.postRequest(data, (res: any) => {
      if (res) {
        this.appService.loading = false;
        if (res.data.userData) {
          this.user = res.data.user;
          console.log('this.user', this.user);
        }
      }
    });
  }

  // логин
  login(data: any, callback: any | undefined) {
    this.appService.loading = true;
    this.postRequest(data, (res: any) => {
      if (res) {
        this.appService.loading = false;
        if (res.data.status) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userId', res.data.id);
          this.user = res.data;
          this.navigationService.goToUrl('home')
        }
      }
      callback(res)
    });
  }

  // выход из аккаунта
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.navigationService.goToUrl('login');
  }

  // регистрация
  registration(data: any, callback: any | undefined) {
    this.appService.loading = true;
    this.postRequest(data, (res: any) => {
      if (res) {
        this.appService.loading = true;

        if (res.status) {
          this.navigationService.goToUrl('login', {}, {stage: res.data.result});
        }
      }
      callback(res);
    });
  }

  // изменение пользователя
  updateUser(data: any, callback: any | undefined) {
    this.appService.loading = true;
    this.postRequest(data, (res: any) => {
      if (res) {
        this.appService.loading = false;
        if (res.data.status) {
          this.user = res.data.user;
        }
      }
      callback(res);
    });
  }

}
