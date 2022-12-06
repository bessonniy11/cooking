import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from '@angular/common/http';
import {AlertController} from '@ionic/angular';
import {LoadingController} from '@ionic/angular';
import {environment} from "../../environments/environment";
import {AppService} from "../services/app.service";
import {NavigationService} from "../services/navigation.service";


@Injectable()
export abstract class MainService {

  protected baseUrl = environment.baseUrl;
  protected apiUrl = environment.apiUrl;
  protected newApiUrl = environment.newApiUrl;
  imagesUrl = environment.imagesUrl;
  dishesImagesUrl = environment.dishesImagesUrl;
  public useNewApi = false;

  protected http: HttpClient;
  protected loader: LoadingController;
  protected appService: AppService;
  protected navigationService: NavigationService;
  protected alert: AlertController;

  public error = false;
  public errorMessage = false;

  public data: any;


  constructor(
    http: HttpClient,
    alert: AlertController,
    loader: LoadingController,
    appService: AppService,
    navigationService: NavigationService
  ) {
    this.http = http;
    this.alert = alert;
    this.loader = loader;
    this.appService = appService;
    this.navigationService = navigationService;
  }

  postRequest(data: any, callback: any | undefined) {

    this.http.post(this.baseUrl + data.link, { data: data }).subscribe(res => {
      // if (res) {console.log('res', res);}
      return callback(res)
    }, error => {
      if (error.status === 0) {
        setTimeout(()=> {
          this.appService.loading = false;
          console.log('Server Error');
        }, 1000);
      }
    });
  }

}
