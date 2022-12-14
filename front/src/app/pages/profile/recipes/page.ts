import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../services/app.service";
import {NavigationService} from "../../../services/navigation.service";
import {UserService} from "../../../services/user.service";
import {SwiperConfigInterface} from "ngx-swiper-wrapper";
import {SearchService} from "../../../services/search.service";
import {ConfirmPopupComponent} from "../../../components/confirm-popup/confirm-popup.component";
import {DomSanitizer} from "@angular/platform-browser";


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

  modalWindow = false;
  recipeName: string = '';
  recipeIndex: string = '';
  confirmBtn: string = 'Удалить';
  closeBtn: string = 'Отмена';
  removeDishId: any = null;

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

  goToThisItem(id: any, dish: any) {
    this.navigationService.goToUrl('dish/' + id, {}, {store: dish});
  }

  toggleText(index: any) {
    this.openText = this.openText === index ? null : index;
  }

  goTo(link: string) {
    this.navigationService.goToUrl(link);
  }


  removeRecipeModal(index: any, removeDishId: any) {
    console.log('removeDishId', removeDishId);
    this.recipeName = `Вы действительно хотите удалить рецепт "${this.dishes[index].dishName}"?`;
    this.removeDishId = removeDishId;
    this.modalWindow = true;
  }

  removeRecipe() {
    this.loading = true;
    this.modalWindow = false;

    const data = {
      dishId: this.removeDishId,
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
    })
  }

  cancelModal() {
    this.modalWindow = false;
  }

  checkVideoPhoto(index: any) {
    this.dishHeaderType = this.dishHeaderType !== index ? index : null;
  }

  urlVideo(index: any) {
    // обработка видео, чтобы выводить разные варианты ссылок
    let srcLink = this.dishes[index].dishVideo;

    if (srcLink.startsWith('https://www.youtube.com/watch?v=')) {
      let embedLink = srcLink.replace('watch?v=', 'embed/');
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedLink);

    } else if (srcLink.startsWith('https://youtu.be')) {
      let embedLink = srcLink.replace('https://youtu.be', 'https://www.youtube.com/embed/');
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedLink);

    } else {
      return this.sanitizer.bypassSecurityTrustResourceUrl(this.dishes[index].dishVideo);
    }
  }
}
