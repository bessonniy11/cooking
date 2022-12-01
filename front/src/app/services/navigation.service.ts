import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {NavController} from "@ionic/angular";
import {NavigationOptions} from "@ionic/angular/providers/nav-controller";

@Injectable({
  providedIn: 'root'
})

export class NavigationService {
  public data: {[key: string]: any} = {};

  constructor(
    private router: Router,
    private nav: NavController
  ) { }

  goToUrl(url: any, options: NavigationOptions = {}, data: any = {}) {
    this.data = data;
    this.nav.navigateForward(url, options);
  }

  goToBack() {
    this.nav.back();
  }

}

