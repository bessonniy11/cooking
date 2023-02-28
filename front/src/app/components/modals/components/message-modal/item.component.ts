import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ModalService} from "../../../../services/modal.service";
import {NavigationService} from "../../../../services/navigation.service";
import {AppService} from "../../../../services/app.service";


@Component({
  selector: 'app-message-modal',
  templateUrl: './item.html',
  styleUrls: ['../item.scss'],
})

export class MessageModalComponent implements OnInit {

  @Input() modal = true;
  @Input() massageModalText: any;

  @Output() resultEventEmitter: EventEmitter<any> = new EventEmitter<any>();
  private modalService: ModalService;
  navigationService: NavigationService;
  appService: AppService;
  closing = false;

  constructor(
    appService: AppService,
    navigationService: NavigationService,
    modalService: ModalService
  ) {
    this.modalService = modalService;
    this.appService = appService;
    this.navigationService = navigationService;
  }

  ngOnInit(): void {
  }

  close() {
    this.closing = true;
    setTimeout(() => {
      this.modalService.closeModal();
    }, 200);
  }
}
