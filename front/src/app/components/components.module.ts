import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";
import {HeaderComponent} from "./header/header.component";
import {FormsModule} from '@angular/forms';
import {ConfirmPopupComponent} from './confirm-popup/confirm-popup.component';
import {RecipeModalComponent} from "./product-modal/recipe-modal.component";
import {SwiperModule} from "ngx-swiper-wrapper";


@NgModule({
  declarations: [
    HeaderComponent,
    ConfirmPopupComponent,
    RecipeModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule,
    SwiperModule,
  ],
  exports: [
    HeaderComponent,
    ConfirmPopupComponent,
    RecipeModalComponent,
  ]
})

export class ComponentsModule {
}
