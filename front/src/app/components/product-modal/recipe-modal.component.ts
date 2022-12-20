import {Component, EventEmitter, Injectable, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AppService} from "../../services/app.service";
import {SwiperConfigInterface} from "ngx-swiper-wrapper";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
  providedIn:'root'
})

@Component({
  selector: 'recipe-modal',
  templateUrl: './recipe-modal.component.html',
  styleUrls: ['./recipe-modal.component.scss']
})
export class RecipeModalComponent implements OnInit {
  appService: AppService;

  @Input() modalWindow = false;
  @Input() title = '';
  @Input() dishName = '';
  @Input() confirmBtn = '';
  @Input() closeBtn = '';
  @Input() dish: any = {};
  @Input() userRecipes: boolean = false;


  @Output() confirmClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancelClick: EventEmitter<any> = new EventEmitter<any>();
  dishHeaderType: boolean = false;

  swiperGalleryConfig: SwiperConfigInterface = {
    slidesPerView: 1,
    pagination: true,
    mousewheel: true,
    keyboard: true,
    setWrapperSize: true,
  };

  constructor(
    appService: AppService,
  ) {
    this.appService = appService;
  }

  ngOnInit(): void {
  }

  removeRecipe(dishId: any) {
    this.appService.closeModal({action: 'delete', dishId: dishId, dishName: this.dishName});
  }

  closeModal() {
    this.appService.closeModal();
  }

  checkVideoPhoto() {
    this.dishHeaderType = !this.dishHeaderType;
  }
}
