import {Component, OnInit} from '@angular/core';
import {NavigationService} from '../../../services/navigation.service';
import {UserService} from "../../../services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../services/app.service";

@Component({
  selector: 'blank',
  templateUrl: 'page.html',
  styleUrls: ['page.scss']
})
export class ProfileMainPage implements OnInit {
  fb: FormBuilder;
  appService: AppService;
  userService: UserService;
  navigationService: NavigationService;

  user: any = {};
  avatar = '/assets/icons/profile_avatar.svg';

  constructor(
    fb: FormBuilder,
    userService: UserService,
    navigationService: NavigationService,
    appService: AppService,
  ) {
    this.fb = fb;
    this.appService = appService;
    this.userService = userService;
    this.navigationService = navigationService;
  }

  ionViewWillEnter() {
    this.user = this.userService.user;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  goTo(link: string) {
    this.navigationService.goToUrl(link);
  }

  logout() {
    this.userService.logout();
  }
}
