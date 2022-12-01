import {Component, OnInit} from '@angular/core';
import {NavigationService} from '../../../services/navigation.service';
import {UserService} from "../../../services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'blank',
  templateUrl: 'page.html',
  styleUrls: ['page.scss']
})
export class ProfileMainPage implements OnInit {
  fb: FormBuilder;
  userService: UserService;
  navigationService: NavigationService;

  user: any = {};
  avatar = '/assets/icons/profile_avatar.svg';

  constructor(
    fb: FormBuilder,
    userService: UserService,
    navigationService: NavigationService,
  ) {
    this.fb = fb;
    this.userService = userService;
    this.navigationService = navigationService;
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.ngOnInit();
  }

  ngOnInit(): void {
    const data = {
      id: localStorage.getItem('userId'),
      link: 'user'
    };

    this.userService.postRequest(data, (callback: any) => {
      console.log('callback', callback);
      if (callback.data.userData) {
        this.user = callback.data.user;
      }
    });
  }

  ngAfterViewInit() {
  }

  goTo(link: string) {
    this.navigationService.goToUrl(link, {}, {user: this.user})
  }

  logout() {
    this.userService.logout();
  }
}
