import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../services/app.service";
import {NavigationService} from "../../../services/navigation.service";
import {UserService} from "../../../services/user.service";
import {SwiperConfigInterface} from "ngx-swiper-wrapper";
import {SearchService} from "../../../services/search.service";
import {ConfirmPopupComponent} from "../../../components/confirm-popup/confirm-popup.component";
import {DomSanitizer} from "@angular/platform-browser";
import {RecipeModalComponent} from "../../../components/product-modal/recipe-modal.component";


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

  dishes: any = [];
  dishHeaderType: number | null = null;

  openText: any = null;
  scrollDisable: boolean = false;

  currentPage = 1;
  perPage = 5;

  loading: boolean = false;

  constructor(
    fb: FormBuilder,
    appService: AppService,
    userService: UserService,
    navigationService: NavigationService,
    searchService: SearchService,
    private confirmPopupComponent: ConfirmPopupComponent,
    private sanitizer: DomSanitizer
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
    this.loading = true;
    this.userService.getDishes(false,(callback: any) =>{
      if (callback) {
        this.loading = false;
        if (callback.data.status) {
          this.dishes = callback.data.result;
        }
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

  openDishModal(id: any, dish: any) {
    const props = {
      dish: dish,
      dishId: dish.dishId,
      dishName: dish.dishName,
      initialBreakpoint: 0.9,
      userRecipes: true
    };

    this.appService.openModal(RecipeModalComponent, props, (data: any) => {
      console.log('data', data);
      if (data.action === 'delete') {
        this.removeRecipe(data.dishName, data.dishId);
      }
    })
  }

  toggleText(index: any) {
    this.openText = this.openText === index ? null : index;
  }

  goTo(link: string) {
    this.navigationService.goToUrl(link);
  }

  removeRecipe(dishName: any, removeDishId: any) {

    const props = {
      dishId: removeDishId,
      title: `Вы действительно хотите удалить рецепт "${dishName}"?`,
      dishName: dishName,
      confirmBtn: 'Удалить',
      closeBtn: 'Отмена',
      initialBreakpoint: 0.4,
      link: 'remove-dish'
    };

    this.appService.openModal(ConfirmPopupComponent, props, (callback: any) =>{
      console.log('callback', callback);

      if (callback.action === 'delete') {
        this.loading = true;

        const data = {
          dishId: callback.dishId,
          link: 'remove-dish'
        };

        this.userService.removeDish(data,(callback: any) =>{
          if (callback) {
            if (callback.data.status) {
              this.userService.getDishes(true,(callback: any) =>{
                this.loading = false;
                if (callback.data.status) {
                  this.dishes = callback.data.result;
                }
              })
            }
          }
        });
      }
    })
  }

  checkVideoPhoto(index: any) {
    this.dishHeaderType = this.dishHeaderType !== index ? index : null;
  }
}
