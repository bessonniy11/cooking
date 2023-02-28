import {ComponentRef, Injectable, ViewContainerRef} from '@angular/core';
import {
  ModalBlankContainerComponent,
  TRANSITION_DELAY as transitionDelayBlank
} from '../components/modals/containers/blank/item.component';
import {
  ModalClassicContainerComponent,
  TRANSITION_DELAY as transitionDelayClassic
} from '../components/modals/containers/сlassic/item.component';
import {
  ModalBottomContainerComponent,
  TRANSITION_DELAY as transitionDelayBottom
} from '../components/modals/containers/bottom/item.component';
import {
  ModalBottomSwipeContainerComponent,
  TRANSITION_DELAY as transitionDelayBottomSwipe
} from '../components/modals/containers/bottom-swipe/item.component';
import {
  ModalSimplifiedContainerComponent,
  TRANSITION_DELAY as transitionDelaySimplified
} from '../components/modals/containers/simplified/item.component';
import {ModalComponent} from "../components/modals/modal.component";
import {ConfirmModalComponent} from "../components/modals/components/confirm/item.component";
import {ContextMenuModalComponent} from "../components/modals/components/context-menu/item.component";
import {MessageModalComponent} from "../components/modals/components/message-modal/item.component";


export const modals = {
  ModalComponent,
  ConfirmModalComponent,
  ContextMenuModalComponent,
  MessageModalComponent,
};
export type Modals = typeof modals[keyof typeof modals];

export enum modalType {
  blank = 'blank',
  classic = 'classic',
  bottom = 'bottom',
  bottomSwipe = 'bottom-swipe',
  fullscreen = 'fullscreen',
  simplified = 'simplified',
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private transitionDelay = 0;
  appViewContainerRef!: ViewContainerRef;
  private containerRef!: ComponentRef<any>;
  private componentRef: any;


  openModal(
    component: Modals,
    inputs: any,
    outputs: any = null,
    type: modalType = modalType.blank
  ) {
    console.log('inputs', inputs);
    console.log('type', type);
    this.closeModal();
    this.containerRef = this.appViewContainerRef.createComponent(this.getContainer(type));
    this.componentRef = this.containerRef.instance.vc.createComponent(component);
    this.containerRef.instance.containerActive = 'open';

    // console.log('this.appViewContainerRef', this.appViewContainerRef);
    console.log('this.containerRef', this.containerRef);
    // console.log('this.componentRef', this.componentRef);
    // console.log('this.componentRef?.componentType', this.componentRef?.componentType);
    // console.log('this.componentRef?.componentType.ctorParameters', this.componentRef?.componentType.ctorParameters);
    // console.log('this.containerRef.instance.vc', this.containerRef.instance.vc);

    const decorators = this.componentRef?.componentType?.propDecorators;

    console.log('decorators', decorators);

    if (decorators) {
      for (const decorator of Object.keys(decorators)) {
        for (const item of decorators[decorator]) {
          const decoratorType = item.type?.prototype?.ngMetadataName;
          if (decoratorType === 'Input' && inputs.hasOwnProperty(decorator)) {
            // Inputs
            this.componentRef.instance[decorator] = inputs[decorator];
          } else if (decoratorType === 'Output') {
            // Outputs
            this.componentRef.instance[decorator]?.subscribe((data: any) => {
              outputs?.({eventName: decorator, data});
            });
          }
        }
      }
    }

  }

  protected getContainer(type: modalType): any {
    switch (type) {
      case modalType.blank:
        this.transitionDelay = transitionDelayBlank;
        return ModalBlankContainerComponent;
      case modalType.classic:
        this.transitionDelay = transitionDelayClassic;
        return ModalClassicContainerComponent;
      case modalType.bottom:
        this.transitionDelay = transitionDelayBottom;
        return ModalBottomContainerComponent;
      case modalType.bottomSwipe:
        this.transitionDelay = transitionDelayBottomSwipe;
        return ModalBottomSwipeContainerComponent;
      case modalType.simplified:
        this.transitionDelay = transitionDelaySimplified;
        return ModalSimplifiedContainerComponent;
      default:
        this.transitionDelay = transitionDelayClassic;
        return ModalClassicContainerComponent;
    }
  }


  closeModal() {
    if (this.containerRef || this.componentRef) {
      const containerRef = this.containerRef;
      const componentRef = this.componentRef;
      this.containerRef.instance.containerActive = 'closed';
      setTimeout(() => {
        componentRef?.destroy();
        containerRef?.destroy();
      }, this.transitionDelay);
    }
  }

}
