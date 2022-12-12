import {Component, EventEmitter, Injectable, Input, OnInit, Output} from '@angular/core';

@Injectable({
  providedIn:'root'
})

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.scss']
})
export class ConfirmPopupComponent implements OnInit {
  @Input() modalWindow = false;
  @Input() title = '';
  @Input() index = '';
  @Input() confirmBtn = '';
  @Input() closeBtn = '';

  @Output() confirmClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancelClick: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
  }

  confirm() {
    this.confirmClick.emit();
  }

  closeModal() {
    this.cancelClick.emit();
  }
}
