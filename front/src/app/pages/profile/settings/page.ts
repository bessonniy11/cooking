import {Component, OnInit, ViewChild} from '@angular/core';
import {NavigationService} from '../../../services/navigation.service';
import {UserService} from "../../../services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import ValidateForm from "../../../helpers/validateform";
import {ActionSheetController, Platform} from "@ionic/angular";
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {AppService} from "../../../services/app.service";
import {ImageCroppedEvent} from "ngx-image-cropper";
import {FilesModelService} from "../../../models/files.model.service";

@Component({
  selector: 'blank',
  templateUrl: 'page.html',
  styleUrls: ['page.scss']
})
export class ProfileSettingsPage implements OnInit {
  @ViewChild('input') input: any;

  fb: FormBuilder;
  userService: UserService;
  navigationService: NavigationService;
  platform: Platform;
  appService: AppService;
  actionSheetController: ActionSheetController;
  camera: Camera;
  profileForm!: FormGroup;
  errorText: string = '';
  errorLogin: string = '';
  confirmDelay: any = null;

  user: any = {};
  avatar: string = '/assets/icons/profile_avatar.svg';
  viewsRoundAvatar: string = '0';

  modalWindow = false;
  imageChangedEvent: any = '';
  imageChangedBase64 = '';
  croppedImage: string | null | undefined = ''; // обрезанное превью фото
  cropperImageReady: any = {};
  errorFormat = '';
  isFileLoad = false; // выбран ли файл
  private fileModelService: any;

  loading: boolean = false;

  constructor(
    fb: FormBuilder,
    userService: UserService,
    navigationService: NavigationService,
    platform: Platform,
    actionSheetController: ActionSheetController,
    camera: Camera,
    appService: AppService,
    fileModelService: FilesModelService,
  ) {
    this.fb = fb;
    this.userService = userService;
    this.navigationService = navigationService;
    this.platform = platform;
    this.appService = appService;
    this.actionSheetController = actionSheetController;
    this.camera = camera;
    this.fileModelService = fileModelService;
  }

  ionViewWillEnter() {
    this.user = this.userService.user;
    if (this.user !== {}) {
      this.profileForm?.controls['username']?.setValue(this.user?.username);
      this.profileForm?.controls['email']?.setValue(this.user?.email);
      this.avatar = this.user.avatar !== null ? this.user.avatar : '/assets/icons/profile_avatar.svg';
      this.viewsRoundAvatar = this.userService.user.viewsRoundAvatar === '1' ? '1' : '0';
    }
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      username: [this.user.username, Validators.required],
      email: [this.user.email, [Validators.email, Validators.required]],
    });
  }

  ngAfterViewInit() {
  }

  openModal() {
    this.modalWindow = true;
  }

  closeModal() {
    this.modalWindow = false;
  }

  changeAvatar() {
    if (this.appService.isCordova()) {
      this.uploadAvatar(true);
      this.closeModal();
    } else {
      this.input.nativeElement.click();
      this.closeModal();
    }
  }

  uploadAvatar(isDevice: any, event?: any) {
    if (isDevice) {
      this.loading = true;
      // запускаем выбор фотио с галереи
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        cameraDirection: this.camera.Direction.FRONT,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      };
      this.camera.getPicture(options).then((imageData) => {
        // console.log("MB: " + imageData.length / 1249956);
        this.loading = false;
        if (imageData) {
          if (imageData.length / 1249956 < 5) {
            this.errorFormat = '';
            this.croppedImage = '';
            this.cropperImageReady = {};
            this.imageChangedBase64 = imageData ? 'data:image/jpeg;base64,' + imageData : this.croppedImage;
            this.isFileLoad = true;
          } else {
            this.errorFormat = 'Допускается размер файла не более 5 мегабайт';
          }
        } else {
          this.errorFormat = '';
          this.croppedImage = '';
          this.cropperImageReady = {};
          this.isFileLoad = false;
        }
      }, (err) => {
        // Handle error
      });
    } else {
      // выбираем файл с input (event)
      console.log('event', event);
      if (event?.target?.files[0].size > 5000000) {
        this.errorFormat = 'Допускается размер файла не более 5 мегабайт';
      } else {
        this.errorFormat = '';
        this.croppedImage = '';
        this.cropperImageReady = {};
        this.imageChangedEvent = event;
        this.isFileLoad = true;
      }
    }
  }

  // функция которая срабатывает при изменении фото в кроппере
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event?.base64;
    const fileBeforeCrop = this.imageChangedEvent?.target?.files[0] ? this.imageChangedEvent?.target?.files[0].name : 'name';
    this.cropperImageReady = this.base64ToFile(
      this.croppedImage,
      fileBeforeCrop
    );
  }

  base64ToFile(data: any, filename: any) {
    const arr = data.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, {type: mime});
  }

  loadImageFailed() {
    this.errorFormat = 'Выбран недоступный формат файла';
    this.isFileLoad = false;
    // console.error('Не тот формат!!!');
  }

  submit() {

    if (this.profileForm.valid) {
      this.loading = true;

      const data = {
        userId: this.user.userId,
        username: this.profileForm.controls['username'].value,
        email: this.profileForm.controls['email'].value,
        avatar: this.avatar,
        viewsRoundAvatar: this.viewsRoundAvatar,
        link: 'update-user'
      };

      console.log('profileForm.valid data', data);

      this.userService.updateUser(data, (callback: any) =>{
        if (callback) {
          this.loading = false;
          this.user = this.userService.user;
        }
      });
    } else {
      ValidateForm.validateAllFormFields(this.profileForm);
    }
  }

  saveNewImg(img: any) {
    this.loading = true;
    this.isFileLoad = false;
    this.fileModelService.loadImage(img, '/file', (result: any) => {

      if (result) {
        this.loading = false;

        // сохраняем получившиеся фото
        this.avatar = this.userService.imagesUrl + result.data.avatarName;
        this.user.avatar = this.userService.imagesUrl + result.data.avatarName;
      }
    });
  }

  removeAvatar() {
    this.avatar = '/assets/icons/profile_avatar.svg';
  }

  changeViewAvatar(event: any) {
    this.viewsRoundAvatar = event.detail.checked ? '1' : '0';
  }

  keyLogin() {
    // отслеживает ввод символов в поле логин
    // показывает ошибку, если пользователь ввёл невалидный логин,
    // но с задерждкой в 1 секунду, чтобы ошибки не было видно во время самого вввода
    if (this.confirmDelay != null) {
      this.errorText = '';
      clearTimeout(this.confirmDelay);
    }
    this.confirmDelay = setTimeout(() => {
      this.errorLoginValid();
    }, 1000);
  }

  errorLoginValid() {
    // показывает ошибку, если пользователь ввёл невалидный логин
    let valueEmail = this.profileForm.controls['email'].value;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let NoErrorLogin = re.test(valueEmail.trim()) || valueEmail === '';
    if (this.profileForm.controls['email'].value.length && !NoErrorLogin) {
      this.errorText = 'Проверьте правильность введённых данных.';
    } else {
      this.errorText = '';
    }
  }
}
