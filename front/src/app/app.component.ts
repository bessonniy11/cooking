import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NavigationService} from "./services/navigation.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private navigationService: NavigationService) {}

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.navigationService.goToUrl('/home');
    } else {
      this.navigationService.goToUrl('/login');
    }

  }

}
