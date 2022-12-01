import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {DishPage} from './page';
import {ComponentsModule} from "../../components/components.module";
import {SwiperModule} from "ngx-swiper-wrapper";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    IonicModule,
    SwiperModule,
    RouterModule.forChild([
      {
        path: '',
        component: DishPage
      }
    ])
  ],
  declarations: [DishPage]
})
export class DishPageModule {

}
