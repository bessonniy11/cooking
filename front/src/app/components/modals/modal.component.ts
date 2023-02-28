import {Component, Injector} from '@angular/core';
import {ModalService} from "../../services/modal.service";
import {appInjector} from "../../core/app-injector";


@Component({
  template: '',
})
export class ModalComponent {
  modalService: ModalService;
  injector: Injector = appInjector();

  constructor() {
    this.modalService = this.injector.get<ModalService>(ModalService);
  }

  // Вызывает закрытие модального окна через сервис
  close(){
    this.modalService.closeModal();
  }

}
