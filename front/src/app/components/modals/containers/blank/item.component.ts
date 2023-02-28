import {Component, ViewChild, ViewContainerRef} from '@angular/core';
import {ModalContainerComponent} from "../../modal-container.component";

export const TRANSITION_DELAY = 0;

@Component({
  selector: 'app-modal-classic-container',
  templateUrl: './item.html',
  styleUrls: ['./item.scss'],
})

export class ModalBlankContainerComponent extends ModalContainerComponent {
  // Используется в modalService для определения контейнера под дочерний компонент
  @ViewChild('vc', {read: ViewContainerRef, static: true}) vc!: ViewContainerRef;

  constructor() {
    super();
  }


}
