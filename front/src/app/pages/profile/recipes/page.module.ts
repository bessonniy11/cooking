import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {UserRecipesPage} from './page';
import {SwiperModule} from "ngx-swiper-wrapper";
import {ComponentsModule} from "../../../components/components.module";

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
        component: UserRecipesPage
      }
    ]),
  ],
  declarations: [UserRecipesPage]
})
export class UserRecipesPageModule {

}
