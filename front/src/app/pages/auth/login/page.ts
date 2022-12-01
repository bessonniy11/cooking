import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {NavigationService} from "../../../services/navigation.service";
import ValidateForm from "../../../helpers/validateform";


@Component({
  selector: 'login',
  templateUrl: 'page.html',
  styleUrls: ['page.scss']
})
export class LoginPage implements OnInit {
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
    userService: UserService,
    private navigationService: NavigationService,
  ) {
    this.userService = userService;
  }

  ionViewWillEnter() {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [Validators.email, Validators.required],
    });

    if (this.navigationService.data) {
      console.log('this.navigationService.data', this.navigationService.data);
      this.loginForm.controls['email'].setValue(this.navigationService.data['email']);
      this.loginForm.controls['password'].setValue(this.navigationService.data['password']);
    }
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

      this.userService.postRequest(data, (callback: any) => {
        if (callback) {
          console.log('callback', callback);
          if (callback.data.status) {
            localStorage.setItem('token', callback.data.password);
            localStorage.setItem('userId', callback.data.id);
            this.navigationService.goToUrl('/home')
          } else {
            this.errorLogin = callback.data.message;
            console.log('this.errorLogin', this.errorLogin);
          }
        } else {
          this.userService.loading = false;
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
    console.log('this.loginForm.controls', this.loginForm.controls);
    let valueEmail = this.loginForm.controls['email'].value;
    console.log('valueEmail', valueEmail);
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let NoErrorLogin = re.test(valueEmail.trim()) || valueEmail === '';
    if (this.loginForm.controls['email'].value.length && !NoErrorLogin) {
      this.errorText = 'Проверьте правильность введённых данных.';
    } else {
      this.errorText = '';
    }
  }

}
