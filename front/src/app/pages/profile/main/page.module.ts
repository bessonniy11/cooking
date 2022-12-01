import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ProfileMainPage} from './page';
import {ComponentsModule} from "../../../components/components.module";
import {SwiperModule} from "ngx-swiper-wrapper";

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    IonicModule,
    SwiperModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProfileMainPage
      }
    ]),
  ],
  declarations: [ProfileMainPage]
})
export class ProfileMainPageModule {

}
