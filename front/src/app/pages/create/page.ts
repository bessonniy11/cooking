import {Component, OnInit, ViewChild} from '@angular/core';
import {NavigationService} from '../../services/navigation.service';
import {UserService} from "../../services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import ValidateForm from "../../helpers/validateform";
import {Camera, CameraOptions} from "@ionic-native/camera/ngx";
import {ImageCroppedEvent} from "ngx-image-cropper";
import {ActionSheetController, Platform} from "@ionic/angular";
import {AppService} from "../../services/app.service";
import {FilesModelService} from "../../models/files.model.service";

@Component({
  selector: 'create',
  templateUrl: 'page.html',
  styleUrls: ['page.scss']
})
export class CreatePage implements OnInit {
  fb: FormBuilder;
  userService: UserService;
  navigationService: NavigationService;
  platform: Platform;
  appService: AppService;
  actionSheetController: ActionSheetController;
  camera: Camera;

  newDishForm!: FormGroup;
  errorText: string = '';

  imgLoad: string = '/assets/icons/image-outline.svg';
  @ViewChild('input') input: any;

  imageChangedEvent: any = '';
  imageChangedBase64 = '';
  croppedImage: string | null | undefined = ''; // обрезанное превью фото
  cropperImageReady: any = {};
  errorFormat = '';
  isFileLoad = false; // выбран ли файл
  private fileModelService: any;
  dishWasCreated: boolean = false;

  images: any = [];
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

  ngOnInit(): void {
    this.newDishForm = this.fb.group({
      video: ['', ''],
      name: ['', Validators.required],
      desc: ['', Validators.required],
    });
  }

  ngAfterViewInit() {
  }

  ionViewWillEnter() {
  }

  onSubmit() {
    this.submit();
  }

  changeImg() {
    if (this.appService.isCordova()) {
      this.uploadImg(true);
    } else {
      this.input.nativeElement.click();
    }
  }

  uploadImg(isDevice: any, event?: any) {
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

    if (this.newDishForm.valid) {
      this.loading = true;

      const data = {
        userId: this.userService.user.userId,
        dishVideo: this.newDishForm.controls['video'].value,
        dishName: this.newDishForm.controls['name'].value,
        dishDesc: this.newDishForm.controls['desc'].value,
        dishImg: this.images,
        link: 'add-dish'
      };

      console.log('data', data);

      this.userService.addDish(data, (callback: any) =>{
        if (callback) {
          this.loading = false;
          console.log('callback', callback);
          if (callback.data.status) {
            this.dishWasCreated = true;
          }
        }
      });
    } else {
      ValidateForm.validateAllFormFields(this.newDishForm);
    }
  }

  saveNewImg(img: any) {
    this.loading = true;
    this.isFileLoad = false;
    this.fileModelService.loadImage(img, '/fileDishes', (result: any) => {
      if (result) {
        this.loading = false;

        // сохраняем получившиеся фото
        this.images.push(this.userService.dishesImagesUrl + result.data.imgName);

        console.log('this.images', this.images);
        // this.userService.user.avatar = this.userService.dishesImagesUrl + result.data.imgName;
      }
    });
  }

  removeImg(index: number) {
    this.images.splice(index, 1);
  }

  createNextRecipe() {
    this.images = [];
    this.newDishForm?.controls['video']?.setValue('');
    this.newDishForm?.controls['name']?.setValue('');
    this.newDishForm?.controls['desc']?.setValue('');
    this.dishWasCreated = false;
  }
}
