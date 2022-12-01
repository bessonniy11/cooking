import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NavigationService} from "./services/navigation.service";
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private navigationService: NavigationService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    Promise.all([
      this.getUser()
    ]).then(() => {
      this.appReady();
    });
  }

  getUser() {
    this.userService.getUser((callback) =>{
    })
  }

  appReady() {
    if (localStorage.getItem('token')) {
      this.navigationService.goToUrl('home');
    } else {
      this.navigationService.goToUrl('login');
    }
  }

}
