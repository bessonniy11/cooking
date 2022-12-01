import {
  Injectable,
} from '@angular/core';
import {
  Platform
} from '@ionic/angular';
import {ActionSheetController} from '@ionic/angular';
import {Camera} from '@ionic-native/camera/ngx';

function _window(): any {
  return window;
}

@Injectable({
  providedIn: 'root',
})
export class AppService {

  platform: Platform;
  actionSheetController: ActionSheetController;
  camera: Camera;


  constructor(
    platform: Platform,
    actionSheetController: ActionSheetController,
    camera: Camera,
  ) {
    this.platform = platform;
    this.actionSheetController = actionSheetController;
    this.camera = camera;
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
}
