import {Component, OnInit} from '@angular/core';
import {NavigationService} from '../../services/navigation.service';
import {UserService} from "../../services/user.service";
import {SwiperConfigInterface} from "ngx-swiper-wrapper";

@Component({
  selector: 'create',
  templateUrl: 'page.html',
  styleUrls: ['page.scss']
})
export class DishPage implements OnInit {
  userService: UserService;
  navigationService: NavigationService;
  dish: any = {};

  swiperGalleryConfig: SwiperConfigInterface = {
    slidesPerView: 1,
    pagination: true,
    mousewheel: true,
    keyboard: true,
    setWrapperSize: true,
  };

  constructor(
    userService: UserService,
    navigationService: NavigationService,
  ) {
    this.userService = userService;
    this.navigationService = navigationService;
  }

  ngOnInit(): void {
    this.dish = this.navigationService.data['store'] ? this.navigationService.data['store'] : {};
    console.log('this.dish', this.dish);
  }

  ngAfterViewInit() {
  }
}
