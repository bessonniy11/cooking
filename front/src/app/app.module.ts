import { ErrorHandler, NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {ComponentsModule} from "./components/components.module";
import {SwiperModule} from 'swiper/angular';
import {pageTransitionAnimation} from "./core/animations/page-transition";
import {Camera} from '@ionic-native/camera/ngx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {ImageCropperModule} from "ngx-image-cropper";
import {ModalsModule} from "./components/modals/modals.module";
import {TokenInterceptor} from "./core/interceptors/token.interceptor";
import {HttpErrorFirebaseInterceptor} from "./core/interceptors/httpErrorFirebase.interceptor";
import {GlobalErrorHandler} from "./core/errors/global-error-handler";
import {AwesomeCordovaNativePlugin} from "@awesome-cordova-plugins/core";
import {RouteReuseStrategy} from "@angular/router";



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    IonicModule.forRoot({
      mode: 'ios',
      navAnimation: pageTransitionAnimation
    }),
    ModalsModule,
    BrowserModule,
    ImageCropperModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
    SwiperModule,
    BrowserAnimationsModule,
  ],
  providers: [
    Camera,
    AwesomeCordovaNativePlugin,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorFirebaseInterceptor,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
