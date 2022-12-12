import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";
import {HeaderComponent} from "./header/header.component";
import {FormsModule} from '@angular/forms';
import {ConfirmPopupComponent} from './confirm-popup/confirm-popup.component';


@NgModule({
  declarations: [
    HeaderComponent,
    ConfirmPopupComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    ConfirmPopupComponent,
  ]
})

export class ComponentsModule {
}
