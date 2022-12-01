import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ProfileSettingsPage} from './page';
import {ComponentsModule} from "../../../components/components.module";
import {SwiperModule} from "ngx-swiper-wrapper";
import {ImageCropperModule} from "ngx-image-cropper";

@NgModule({
  imports: [
    CommonModule,
    ImageCropperModule,
    ComponentsModule,
    ReactiveFormsModule,
    IonicModule,
    SwiperModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProfileSettingsPage
      }
    ]),
  ],
  declarations: [ProfileSettingsPage]
})
export class ProfileSettingsPageModule {

}
