import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CreatePage} from './page';
import {ComponentsModule} from "../../components/components.module";
import {ImageCropperModule} from "ngx-image-cropper";

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    ImageCropperModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: CreatePage
      }
    ]),
  ],
  declarations: [CreatePage]
})
export class CreatePageModule {

}
