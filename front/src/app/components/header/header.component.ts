import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NavigationService} from "../../services/navigation.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  navigationService: NavigationService;

  @ViewChild('searchInput') searchInput: any;

  @Input() title = '';
  @Input() back = false;
  @Input() search = false;
  @Input() create = false;
  @Input() profile = false;
  @Input() dice = false;
  @Input() homePage = false;

  searchActive: boolean = false;
  public searchText = '';

  constructor(
    navigationService: NavigationService,

    ) {this.navigationService = navigationService}

  ngOnInit(): void {
  }

  goTo(link: string) {
    this.navigationService.goToUrl(link);
  }

  clickOutsideSearch() {
    if (this.searchActive) {
      this.searchActive = false;
    }
  }

  searchInputFocus() {
    this.searchActive = !this.searchActive;
  }

  searchToggle() {
    this.searchActive = !this.searchActive;
    if (this.searchActive) {
      setTimeout(()=>{
        this.searchInput.nativeElement.focus();
      }, 301);

    }
  }
}
