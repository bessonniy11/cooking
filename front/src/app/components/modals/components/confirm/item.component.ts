import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ModalComponent} from "../../modal.component";

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './item.html',
  styleUrls: ['./item.scss'],
})

export class ConfirmModalComponent extends ModalComponent {

  @Input() icon = '/assets/icons/alert_icon.svg';
  @Input() title = 'Вы уверены?';
  @Input() text = '';
  @Input() confirmButtonText = '';
  @Input() cancelButtonText = '';
  @Input() confirmBtnClass = 'btn-confirm';
  @Input() cancelBtnClass = 'btn-cancel';
  @Input() cancelBtnAnimatedType = 'btn-confirm';
  @Input() confirmBtnAnimatedType = 'btn-cancel';
  @Input() wineName = true;
  @Input() mobBtn = false;

  @Output() confirmClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancelClick: EventEmitter<any> = new EventEmitter<any>();


  constructor(
  ) {
    super();
  }

  clickConfirm() {
    this.confirmClick.emit();
  }

  clickCancel() {
    console.log('clickCancel');
    this.cancelClick.emit();
  }
}
