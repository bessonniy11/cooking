import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.scss']
})
export class ConfirmPopupComponent implements OnInit {
  @Input() modalWindow = false;
  @Input() confirmBtn = '';
  @Input() closeBtn = '';
  //
  // @Output() confirmClick: EventEmitter<any> = new EventEmitter<any>();
  // @Output() cancelClick: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
  }

  openModal() {

  }


  confirm() {
    //this.confirmClick.emit();
  }

  closeModal() {
    //this.cancelClick.emit();
  }
}
