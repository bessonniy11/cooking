import {Component, ViewChild, ViewContainerRef} from '@angular/core';
import {animate, state, style, transition, trigger,} from '@angular/animations';
import {ModalContainerComponent} from "../../modal-container.component";

export const TRANSITION_DELAY = 250;

const animateOptions = {
  timing: `${TRANSITION_DELAY}ms cubic-bezier(0, 0, 0.2, 1)`,
  container: {
    open: style({opacity: 1, transform: 'translateY(0px)'}),
    closed: style({opacity: 0, transform: 'translateY(-30px)'})
  }
};

@Component({
  selector: 'app-modal-fullscreen-container',
  templateUrl: './item.html',
  styleUrls: ['./item.scss'],
  animations: [
    trigger('container', [
      state('open', animateOptions.container.open),
      state('closed', animateOptions.container.closed),
      transition('* => open', [
        animateOptions.container.closed,
        animate(animateOptions.timing)
      ]),
      transition('open => closed', [
        animate(animateOptions.timing)
      ]),
    ]),
  ],
})

export class ModalFullscreenContainerComponent extends ModalContainerComponent {
  // Используется в modalService для определения контейнера под дочерний компонент
  @ViewChild('vc', {read: ViewContainerRef, static: true}) vc!: ViewContainerRef;
  public viewRef!: ViewContainerRef;

  constructor() {
    super();
  }


}
