import {
  ComponentFactoryResolver,
  Injectable,
} from '@angular/core';
import {
  ModalController,
  Platform
} from '@ionic/angular';
import {ActionSheetController} from '@ionic/angular';
import {Camera} from '@ionic-native/camera/ngx';
import {DomSanitizer} from "@angular/platform-browser";

function _window(): any {
  return window;
}

@Injectable({
  providedIn: 'root',
})
export class AppService {

  platform: Platform;
  actionSheetController: ActionSheetController;
  factory: ComponentFactoryResolver;
  modalController: ModalController;
  camera: Camera;
  openDish: any = {};

  private modalWindow: any;
  isOpenPickerModal = false;

  constructor(
    platform: Platform,
    actionSheetController: ActionSheetController,
    camera: Camera,
    factory: ComponentFactoryResolver,
    modalController: ModalController,
    private sanitizer: DomSanitizer,
  ) {
    this.platform = platform;
    this.actionSheetController = actionSheetController;
    this.camera = camera;
    this.factory = factory;
    this.modalController = modalController;
  }


  isIos() {
    return this.platform.is('ios');
  }

  isAndroid() {
    return this.platform.is('android');
  }

  isCordova() {
    return this.platform.is('cordova');
  }

  isDevice() {
    return this.isCordova() && (this.isAndroid() || this.isIos());
  }

  getCordova() {
    if (this.isDevice()) {
      return this.getWindow().cordova;
    }

    return null;
  }

  getWindow() {
    return _window();
  }

  closeModal(data: any = {action: 'close'}) {
    if (this.modalWindow) {
      this.modalController.dismiss(data);
    }
  }


  async openModal(component: any, props: any, callback: any) {
    const {selector} = this.factory.resolveComponentFactory(component);
    this.modalWindow = await this.modalController.create({
      component,
      componentProps: props,
      swipeToClose: true,
      // mode: 'ios',
      canDismiss: true,
      cssClass: 'app-modal modal-' + selector,
      // initialBreakpoint: 0.9,
      breakpoints: [0, 0.25, 0.5, 0.9],
      showBackdrop: true,
    });

    await this.modalWindow.present().then(() => {
      this.isOpenPickerModal = true;

    });

    await this.modalWindow.onDidDismiss().then((res: any) => {

      if (res.data && callback) {
        callback(res.data);
      }

      this.isOpenPickerModal = false;
      this.modalWindow = null;
    });

    return this.modalWindow;
  }

  urlVideo(index?: any, dishes?: any, dish?: any) {
    // обработка видео, чтобы выводить разные варианты ссылок
    let srcLink = dishes ? dishes[index].dishVideo : dish.dishVideo;

    if (srcLink.startsWith('https://www.youtube.com/watch?v=')) {
      let embedLink = srcLink.replace('watch?v=', 'embed/');
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedLink);

    } else if (srcLink.startsWith('https://youtu.be')) {
      let embedLink = srcLink.replace('https://youtu.be', 'https://www.youtube.com/embed/');
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedLink);

    } else {
      return this.sanitizer.bypassSecurityTrustResourceUrl(dishes[index].dishVideo);
    }
  }

}
