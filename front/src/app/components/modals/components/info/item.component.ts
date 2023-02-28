import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ModalComponent} from '@components/modals/modal.component';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './item.html',
  styleUrls: ['./item.scss'],
})

export class InfoModalComponent extends ModalComponent {

  @Input() icon = '';
  @Input() title = '';
  @Input() text = '';
  @Input() buttonText = '';
  @Input() className = '';

  @Output() buttonClick: EventEmitter<any> = new EventEmitter<any>();


  constructor() {
    super();
  }

  clickButton() {
    this.buttonClick.emit();
  }

}
