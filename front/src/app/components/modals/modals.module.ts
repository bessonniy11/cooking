import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {ModalContainerComponent} from "./modal-container.component";
import {ModalBlankContainerComponent} from "./containers/blank/item.component";
import {ModalClassicContainerComponent} from "./containers/сlassic/item.component";
import {ModalBottomContainerComponent} from "./containers/bottom/item.component";
import {ModalBottomSwipeContainerComponent} from "./containers/bottom-swipe/item.component";
import {ModalSimplifiedContainerComponent} from "./containers/simplified/item.component";
import {ModalFullscreenContainerComponent} from "./containers/fullscreen/item.component";
import {ModalComponent} from "./modal.component";
import {ConfirmModalComponent} from "./components/confirm/item.component";
import {ContextMenuModalComponent} from "./components/context-menu/item.component";
import {ComponentsModule} from "../components.module";
import {SwiperModule} from "ngx-swiper-wrapper";
import {AnimatedButtonComponent} from "../animated-button/item.component";


const containers = [
  ModalContainerComponent,
  ModalBlankContainerComponent,
  ModalClassicContainerComponent,
  ModalBottomContainerComponent,
  ModalBottomSwipeContainerComponent,
  ModalSimplifiedContainerComponent,
  ModalFullscreenContainerComponent,
];
const components = [
  ModalComponent,
  ConfirmModalComponent,
  ContextMenuModalComponent,
];

@NgModule({
  declarations: [
    ...containers,
    ...components,
    AnimatedButtonComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentsModule,
    SwiperModule,
  ],
  exports: [
    ...containers,
    ...components
  ]
})

export class ModalsModule {
}
