import {Component, EventEmitter, Injectable, Input, OnInit, Output} from '@angular/core';
import {AppService} from "../../services/app.service";

@Injectable({
  providedIn:'root'
})

@Component({
  selector: 'app-info-popup',
  templateUrl: './info-popup.component.html',
  styleUrls: ['./info-popup.component.scss']
})
export class InfoPopupComponent implements OnInit {
  appService: AppService;

  @Input() title = '';

  constructor(
    appService: AppService,
  ) {
    this.appService = appService;
  }

  ngOnInit(): void {
  }

  confirm() {
    this.appService.closeModal({action: 'close'});
  }

  closeModal() {
    this.appService.closeModal();
  }
}
