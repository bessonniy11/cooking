import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NavigationService} from "../../services/navigation.service";
import {UserService} from "../../services/user.service";
import {AppService} from "../../services/app.service";
import {SearchService} from "../../services/search.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  appService: AppService;
  userService: UserService;
  navigationService: NavigationService;
  searchService: SearchService;

  @Input() title: any = '' || false;
  @Input() back = false;
  @Input() search = false;
  @Input() create = false;
  @Input() profile = false;
  @Input() dice = false;
  @Input() filter = false;
  @Input() homePage = false;

  @ViewChild('searchInput') searchInput: any;
  searchActive: boolean = false;

  constructor(
    appService: AppService,
    userService: UserService,
    navigationService: NavigationService,
    searchService: SearchService

    ) {
    this.appService = appService;
    this.userService = userService;
    this.navigationService = navigationService;
    this.searchService = searchService;
  }

  ngOnInit(): void {
  }

  searchToggle() {
    this.searchActive = !this.searchActive;
    if (this.searchActive) {
      setTimeout(()=>{
        this.searchInput?.nativeElement.focus();
      }, 301);
    }
    if (this.searchService.searchValue().length) {
      this.searchService.searchText = '';
    }
  }

  goTo(link: string) {
    this.navigationService.goToUrl(link);
  }
}
