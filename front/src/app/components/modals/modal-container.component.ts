import {Component, Injector} from '@angular/core';
import {ModalService} from "../../services/modal.service";
import {appInjector} from "../../core/app-injector";

@Component({
  template: '',
})
export class ModalContainerComponent {
  containerActive: 'open' | 'closed' | null = 'closed';
  animateOptions = {
    timing: '1000ms ease'
  };

  modalService: ModalService;
  injector: Injector = appInjector();

  // Используется в modalService для анимации закрытия модального окна перед .destroy()

  constructor(
  ) {
    this.modalService = this.injector?.get<ModalService>(ModalService);
  }

  // Вызывает закрытие модального окна через сервис
  close() {
    this.modalService?.closeModal();
  }

}
