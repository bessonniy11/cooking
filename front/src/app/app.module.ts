import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import {ComponentsModule} from "./components/components.module";
import {SwiperModule} from 'swiper/angular';
import {pageTransitionAnimation} from "./core/animations/page-transition";
import {Camera} from '@ionic-native/camera/ngx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {ImageCropperModule} from "ngx-image-cropper";



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    IonicModule.forRoot({
      mode: 'ios',
      navAnimation: pageTransitionAnimation
    }),
    BrowserModule,
    ImageCropperModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
    SwiperModule,
    BrowserAnimationsModule
  ],
  providers: [Camera],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
