import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {NavigationService} from "./navigation.service";
import {MainService} from "../core/main.service";
import {AlertController, LoadingController} from "@ionic/angular";
import {AppService} from "./app.service";

@Injectable({
  providedIn: 'root'
})
export class UserService extends MainService {
  user: any = null;
  avatar: string = '/assets/icons/profile_avatar.svg';

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
      userId: localStorage.getItem('userId'),
      link: 'user'
    };

    this.postRequest(data, (res: any) => {
      if (res) {
        this.appService.loading = false;
        if (res.data.userData) {
          this.user = res.data.user;
          this.avatar = res.data.user?.avatar !== null ? res.data.user.avatar : '/assets/icons/profile_avatar.svg';
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
        console.log('res', res);
        this.appService.loading = false;
        if (res.data.status) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userId', res.data.userId);
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
        this.appService.loading = false;

        if (res.data.status) {
          this.navigationService.goToUrl('login', {}, {stage: res.data.result});
        }
      }
      callback(res);
    });
  }

  // создание рецепта
  addDish(data: any, callback: any | undefined) {
    this.appService.loading = true;
    this.postRequest(data, (res: any) => {
      console.log('addDish res', res);
      if (res) {
        this.appService.loading = false;

        if (res.data.status) {
          // this.navigationService.goToUrl('/profile/recipes');
        }
      }
      callback(res);
    });
  }

  // получение блюд пользователя
  getDishes(allUsers: boolean, callback: any | undefined) {
    console.log('this.user.userId', this.user?.userId);
    this.appService.loading = true;

    const data = {
      userId: allUsers ? 'all' : this.user?.userId,
      link: 'dishes'
    };

    this.postRequest(data, (res: any) => {
      console.log('getDishes res', res);
      if (res) {
        this.appService.loading = false;

        if (res.status) {

        }
      }
      callback(res);
    });
  }

  // изменение пользователя
  updateUser(data: any, callback: any | undefined) {
    this.appService.loading = true;
    console.log('updateUser data start', data);
    this.postRequest(data, (res: any) => {
      if (res) {
        this.appService.loading = false;
        if (res.data.status) {
          console.log('updateUser.data', res.data);
          this.user = res.data.user;
          // console.log('res.data.user', res.data.user);
          // console.log('this.user', this.user);
        }
      }
      callback(res);
    });
  }

}
