import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppService} from "../services/app.service";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class FilesModelService {

  model: any;

  constructor(
    protected http: HttpClient,
    appService: AppService
  ) {

    this.model = 'files';
  }

  loadImage(file: File, link: string, callback: (result: any) => void) {
    const formData: FormData = new FormData();
    formData.append('file0', file, file.name);
    console.log(formData);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    this.http.post<any>(environment.baseUrl + link, formData, {headers}).subscribe(result => {
      callback(result);
      if (result?.status && result?.result?.data?.length > 0) {
        callback(result);
      }
    });

  }

}
