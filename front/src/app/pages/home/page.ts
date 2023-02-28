import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {NavigationService} from "../../services/navigation.service";
import {SwiperConfigInterface} from 'ngx-swiper-wrapper';
import {AppService} from "../../services/app.service";
import {SearchService} from "../../services/search.service";
import {DomSanitizer} from "@angular/platform-browser";
import {modals, ModalService, modalType} from "../../services/modal.service";



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
    private sanitizer: DomSanitizer,
    private modalService: ModalService
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
    // обработка видео, чтобы выводить разные варианты ссылок
    let srcLink = this.dishes[index].dishVideo;

    if (srcLink.startsWith('https://www.youtube.com/watch?v=')) {
      let embedLink = srcLink.replace('watch?v=', 'embed/');
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedLink);

    } else if (srcLink.startsWith('https://youtu.be')) {
      let embedLink = srcLink.replace('https://youtu.be', 'https://www.youtube.com/embed/');
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedLink);

    } else {
      // если вместо видео с ютуба приходит некорректная ссылка
      return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUQAAACbCAMAAAAtKxK6AAAAYFBMVEV2dnb///9ycnJvb294eHhoaGj8/PyXl5eurq6hoaFubm6kpKR7e3uysrJra2vX19fv7++8vLzExMSMjIzi4uKTk5PLy8ucnJyCgoLm5ub19fXT09Pt7e1gYGC+vr6Ojo7wLUsFAAADHklEQVR4nO3b626jMBCGYTw2JJhTCORQmnbv/y53DHR3k7S7obJEVnqfqhGI/LA+zdiYJEkCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACWcOFFEuf0SF/EeutKWXtU/6UpytqfD0V1mE/xGDen5WwtZbcpqmZnTOUdIS4iPrSu3fQvuyEzo31NJf7FWGFunv/00Pqkyws9lnOTZZrhGGOfrj3O5xZSdG7MUsqkK9rjxZjChtN+yMYcjdmlTIpfCwlq//raOid1PzWv5nZ80+X47d1kc0N3ZPg1kTrpTu2xKcJE2DUaoP6p1jspy72ZKtFUNSFemW//xto6aPv2Q2jYvC4T/6MPZTgGV/hwvZlXlsauPernIhqhTTUy0Qau5pA0ufc0cV76sRbD+T7V2kzfp6s7KSnFPzlJima3e9VZz0k+zA1rMm3Z0nbHj1CzVt+YlMfdpTm2hWPHcq30Y31tndZi2k5Lh06DQ+WltOXRfFRnG/Z8vnS67asdd9tXnLPF2LRHCfu6ai48jW7jtTbTy7RC921RilarhMmzXHvQz0c2w1hur6kWY1llZr4d1Fp0Iufja7s9nMOkufZAn5Ymo7uRqWf3VoOqczNvTDRFq8tOmlqx8nsbjTvj5q6dG3ivx+5t7Ojd/jRvXFxYRYQM/yLcJsp2DFH7uBnPi+JwDrmN18M+Wkjw37ppNRkuLz9s6G97ewfjEsd2+R+8GYbX6lBKyurxbT4/Tw/8qbfvc9Z+THtsRb7Jhc1KkFh5yNoDfkr2tFnisDmd1x7y8/FmqYqHYbf8r6cMj9oS4q3aLEsxM1u/9pifTrqwDqnETxBiBIQYASFGQIgREGIEhBgBIUZAiBEQYgSEGAEhRkCIERBiBIQYASFGQIgREGIEhBgBIUZAiBGkSz/sI8R79cevfB5OcVuvPeans7CdNfGC7+Pc8gs/vKedP/H2sjDE/kwl3pLNZUmKmckpxDuuPvQL6nDY8ivTe1KKy/O8KH7/X50UV1dOnXXCj6ruOEke+46sspZvdgMAAAAAAAAAAAAAAAAAAAAAAAAA/l8/AQC/H56qQf3lAAAAAElFTkSuQmCC');
    }
  }

  modalTest() {
    this.modalService.openModal(
      modals.ConfirmModalComponent,
      {
        icon: '/assets/icons/success.svg',
        title: 'Успешно!',
        text: `Вы активировали тариф`,
        cancelButtonText: 'Перейти на главную',
        cancelBtnClass: 'mob-btn'
      }, ((data: any) => {
        console.log('data', data);
        if (data.eventName === 'cancelClick') {
          this.modalService.closeModal();
          this.navigationService.goToUrl('/user');
        }
      }), modalType.bottomSwipe);
  }
}
