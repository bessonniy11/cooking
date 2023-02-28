import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalComponent} from "../../modal.component";

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './item.html',
  styleUrls: ['./item.scss'],
})

export class ContextMenuModalComponent extends ModalComponent {

  @Input() groupButtons: {
    key: string;
    label: string;
    className?: string;
  }[] = [];

  @Input() buttons: {
    key: string;
    label: string;
    className?: string;
  }[] = [];

  @Output() buttonClick: EventEmitter<any> = new EventEmitter<any>();


  constructor() {
    super();
  }

  clickButton(key: string) {
    this.buttonClick.emit(key);
  }
}
