import {Component, ViewChild, ViewContainerRef} from '@angular/core';
import {animate, state, style, transition, trigger,} from '@angular/animations';
import {ModalContainerComponent} from "../../modal-container.component";


export const TRANSITION_DELAY = 250;

const animateOptions = {
  timing: `${TRANSITION_DELAY}ms cubic-bezier(0, 0, 0.2, 1)`,
  backdrop: {
    open: style({background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(4px)'}),
    closed: style({background: 'rgba(255, 255, 255, 0)', backdropFilter: 'blur(0px)'})
  },
  container: {
    open: style({transform: 'translateY(0px)'}),
    closed: style({transform: 'translateY(100%)'})
  }
};

@Component({
  selector: 'app-modal-bottom-container',
  templateUrl: './item.html',
  styleUrls: ['./item.scss'],
  animations: [
    trigger('backdrop', [
      state('open', animateOptions.backdrop.open),
      state('closed', animateOptions.backdrop.closed),
      transition('* => open', [
        animateOptions.backdrop.closed,
        animate(animateOptions.timing)
      ]),
      transition('open => closed', [
        animate(animateOptions.timing)
      ]),
    ]),
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

export class ModalBottomContainerComponent extends ModalContainerComponent {
  // Используется в modalService для определения контейнера под дочерний компонент
  @ViewChild('vc', {read: ViewContainerRef, static: true}) vc!: ViewContainerRef;
  public viewRef!: ViewContainerRef;

  constructor() {
    super();
  }


}
