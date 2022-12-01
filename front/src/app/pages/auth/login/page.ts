import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {NavigationService} from "../../../services/navigation.service";
import ValidateForm from "../../../helpers/validateform";
import {AppService} from "../../../services/app.service";


@Component({
  selector: 'login',
  templateUrl: 'page.html',
  styleUrls: ['page.scss']
})
export class LoginPage implements OnInit {
  appService: AppService;
  userService: UserService;

  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  loginForm!: FormGroup;
  confirmDelay: any = null;
  errorText: string = '';
  errorLogin: string = '';

  constructor(
    private fb: FormBuilder,
    appService: AppService,
    userService: UserService,
    private navigationService: NavigationService,
  ) {
    this.appService = appService;
    this.userService = userService;
  }

  ionViewWillEnter() {
    if (this.navigationService.data['stage']) {
      this.loginForm.controls['email'].setValue(this.navigationService.data['stage'].email);
      this.loginForm.controls['password'].setValue(this.navigationService.data['stage'].password);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash';
    this.isText ? this.type = 'text' : this.type = 'password';
  }

  onSubmit() {

    if (this.loginForm.valid) {

      const data = {
        email: this.loginForm.controls['email'].value,
        password: this.loginForm.controls['password'].value,
        link: 'login'
      };

      this.userService.login(data, (callback: any) => {
        if (!callback.data.status) {
          this.errorLogin = callback.data.message;
        }
      });

    } else {
      ValidateForm.validateAllFormFields(this.loginForm);
    }
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
    let valueEmail = this.loginForm.controls['email'].value;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let NoErrorLogin = re.test(valueEmail.trim()) || valueEmail === '';
    if (this.loginForm.controls['email'].value.length && !NoErrorLogin) {
      this.errorText = 'Проверьте правильность введённых данных.';
    } else {
      this.errorText = '';
    }
  }

}
