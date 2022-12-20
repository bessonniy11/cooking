import {Component, EventEmitter, Injectable, Input, OnInit, Output} from '@angular/core';
import {AppService} from "../../services/app.service";

@Injectable({
  providedIn:'root'
})

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.scss']
})
export class ConfirmPopupComponent implements OnInit {
  appService: AppService;

  @Input() title = '';
  @Input() dishName = '';
  @Input() dishId = null;
  @Input() confirmBtn = '';
  @Input() closeBtn = '';

  constructor(
    appService: AppService,
  ) {
    this.appService = appService;
  }

  ngOnInit(): void {
  }

  confirm() {
    this.appService.closeModal({action: 'delete', dishId: this.dishId, dishName: this.dishName});
  }

  closeModal() {
    this.appService.closeModal();
  }
}
