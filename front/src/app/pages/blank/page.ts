import {Component, OnInit} from '@angular/core';
import {NavigationService} from '../../services/navigation.service';
import {UserService} from "../../services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'blank',
  templateUrl: 'page.html',
  styleUrls: ['page.scss']
})
export class BlankPage implements OnInit {
  fb: FormBuilder;
  userService: UserService;
  navigationService: NavigationService;

  constructor(
    fb: FormBuilder,
    userService: UserService,
    navigationService: NavigationService,
  ) {
    this.fb = fb;
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
