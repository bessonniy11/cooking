import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../services/app.service";
import {NavigationService} from "../../../services/navigation.service";
import {UserService} from "../../../services/user.service";
import {SwiperConfigInterface} from "ngx-swiper-wrapper";
import {SearchService} from "../../../services/search.service";
import {ConfirmPopupComponent} from "../../../components/confirm-popup/confirm-popup.component";


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
  searchService: SearchService;

  swiperGalleryConfig: SwiperConfigInterface = {
    slidesPerView: 1,
    pagination: true,
    mousewheel: true,
    keyboard: true,
    setWrapperSize: true,
  };

  dishes: any = [
    // {
    //   id:1,
    //   title:'Банановые блинчики из рисовой муки',
    //   gallery: [
    //     'https://www.sechenov.ru/upload/medialibrary/abb/pitanie.jpg',
    //     'https://www.sechenov.ru/upload/medialibrary/abb/pitanie.jpg',
    //     'https://www.sechenov.ru/upload/medialibrary/abb/pitanie.jpg',
    //   ],
    //   desc:
    //     'Вкусный, полезный, лёгкий завтрак для всей семьи! ' +
    //     'Приготовим румяные банановые блинчики из рисовой муки, ' +
    //     'на молоке. Блинчики понравятся тем, кто придерживается правильного питания.'
    // },
  ];

  openText: any = null;
  scrollDisable: boolean = false;

  modalWindow = false;
  confirmBtn: string = 'test';
  closeBtn: string = 'test';

  currentPage = 1;
  perPage = 5;

  constructor(
    fb: FormBuilder,
    appService: AppService,
    userService: UserService,
    navigationService: NavigationService,
    searchService: SearchService,
    private confirmPopupComponent: ConfirmPopupComponent,
  ) {
    this.fb = fb;
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
    this.userService.getDishes(false,(callback: any) =>{
      console.log('loadUserDishes callback', callback);
      if (callback.data.status) {
        this.dishes = callback.data.result;
        console.log('this.dishes', this.dishes);
      }
    })
  }

  ngAfterViewInit() {
  }

  click() {
    console.log('click');
  }

  returnList() {
    let searchValue = this.searchService.searchValue();
    return this.dishes?.filter(
      ((item: any) => item?.dishName?.toLowerCase().indexOf(searchValue.toLowerCase()) > -1))
      .slice(0, this.currentPage * this.perPage);
  }

  loadMore(event: any) {
    // console.log('loadMore');
    this.currentPage ++;
    this.returnList();
    this.scrollDisable = this.perPage!== this.returnList()?.length/this.currentPage;
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


}
