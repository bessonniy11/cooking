import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../services/app.service";
import {NavigationService} from "../../../services/navigation.service";
import {UserService} from "../../../services/user.service";


@Component({
  selector: 'blank',
  templateUrl: 'page.html',
  styleUrls: ['page.scss']
})
export class UserRecipesPage implements OnInit {
  fb: FormBuilder;
  appService: AppService;
  userService: UserService;
  navigationService: NavigationService;

  constructor(
    fb: FormBuilder,
    appService: AppService,
    userService: UserService,
    navigationService: NavigationService,
  ) {
    this.fb = fb;
    this.appService = appService;
    this.userService = userService;
    this.navigationService = navigationService;
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
  }

  click() {
    console.log('click');
  }
}
