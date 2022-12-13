import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {NavigationService} from "../../services/navigation.service";
import {SwiperConfigInterface} from 'ngx-swiper-wrapper';
import {AppService} from "../../services/app.service";
import {SearchService} from "../../services/search.service";
import {DomSanitizer} from "@angular/platform-browser";



@Component({
  selector: 'home',
  templateUrl: 'page.html',
  styleUrls: ['page.scss']
})
export class HomePage implements OnInit {
  appService: AppService;
  userService: UserService;
  navigationService: NavigationService;
  searchService: SearchService;

  swiperGalleryConfig: SwiperConfigInterface = {
    slidesPerView: 1,
    pagination: true,
    mousewheel: true,
    keyboard: true,
    setWrapperSize: true,
  };

  dishes: any = [];
  dishHeaderType: number | null = null;

  openText: any = null;
  scrollDisable: boolean = false;
  currentPage = 1;
  perPage = 5;
  loading: boolean = false;

  constructor(
    userService: UserService,
    navigationService: NavigationService,
    appService: AppService,
    searchService: SearchService,
    private sanitizer: DomSanitizer
  ) {
    this.appService = appService;
    this.userService = userService;
    this.navigationService = navigationService;
    this.searchService = searchService;
  }

  ngOnInit(): void {
  }

  ionViewWillEnter() {
    this.loadUserDishes();
  }

  loadUserDishes() {
    this.loading = true;
    this.userService.getDishes(true,(callback: any) =>{
      console.log('loadUserDishes callback', callback);
      if (callback) {
        this.loading = false
      }
      if (callback.data.status) {
        this.dishes = callback.data.result;
        console.log('this.dishes', this.dishes);
      }
    })
  }

  returnList() {
    let searchValue = this.searchService.searchValue();
    return this.dishes?.filter(
      ((item: any) => item.dishName?.toLowerCase().indexOf(searchValue.toLowerCase()) > -1))
      .slice(0, this.currentPage * this.perPage);
  }

  loadMore(event: any) {
    // console.log('loadMore');
    this.currentPage ++;
    this.returnList();
    this.scrollDisable = this.perPage !== this.returnList()?.length/this.currentPage;
    event.target.complete();
    // this.loadDishes(event);
  }


  goToThisItem(id: any, dish: any) {
    this.navigationService.goToUrl('dish/' + id, {}, {store: dish});
  }

  toggleText(index: any) {
    this.openText = this.openText === index ? null : index;
  }

  goTo(link: string) {
    this.navigationService.goToUrl(link);
  }

  checkVideoPhoto(index: any) {
    this.dishHeaderType = this.dishHeaderType !== index ? index : null;
  }

  urlVideo(index: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.dishes[index].dishVideo.replace('watch?v=','embed/'))
  }
}
