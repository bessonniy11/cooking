import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import ValidateForm from "../../../helpers/validateform";
import { UserService } from "../../../services/user.service";
import { NavigationService } from "../../../services/navigation.service";

@Component({
  selector: 'registration',
  templateUrl: 'page.html',
  styleUrls: ['page.scss']
})
export class SignupComponent implements OnInit {
  userService: UserService;

  typePassword: string = 'password';
  typePasswordConfirm: string = 'password';
  signeUpForm!: FormGroup;
  confirmDelay: any = null;
  errorText: string = '';
  passInvalid: boolean = false;
  isValid: boolean = false;

  constructor(
    private fb: FormBuilder,
    userService: UserService,
    private navigationService: NavigationService,
  ) {
    this.userService = userService;
  }

  ngOnInit(): void {
    this.signeUpForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: ['', [Validators.required, this.validators.password]],
      passwordConfirm: ['', [Validators.required, this.validators.password]],
    })
  }

  validators = {
    password: (control: AbstractControl) => {
      const password = this.signeUpForm?.controls['password'].value;
      const confirmation = this.signeUpForm?.controls['passwordConfirm'].value;

      const length = confirmation?.length && password?.length;
      const lengthMin = password?.length >= 8;
      const hasError = this.signeUpForm?.controls['passwordConfirm']?.errors || this.signeUpForm?.controls['password']?.errors;

      this.passInvalid = false;
      if (!lengthMin && this.signeUpForm?.touched) {
        this.signeUpForm?.controls['password'].setErrors({ text: 'Пароль должен быть не менее 8 символов' });
        this.passInvalid = true;
        return { text: 'Пароль должен быть не менее 8 символов' };
      } else if (password !== confirmation && this.signeUpForm?.controls['passwordConfirm'].value.length) {
        this.signeUpForm?.controls['password'].setErrors({ notSame: 'Пароли не совпадают' });
        return { notSame: 'Пароли не совпадают' };
      }

      if (hasError && password === confirmation && length) {
        this.signeUpForm?.controls['password'].setErrors(null);
        this.signeUpForm?.controls['passwordConfirm']?.setErrors(null);
        return null;
      }
      this.isValid = true;
      return null;
    },
  };

  getPasswordError() {
    const array = [this.signeUpForm?.controls['password'].errors, this.signeUpForm.controls['passwordConfirm'].errors];
    for (const key in array) {
      if (array[key]?.['notSame']) {
        return array[key]?.['notSame'];
      } else if (array[key]?.['text']) {
        return array[key]?.['text'];
      }
    }
  }

  hideShowPass(pass_passConfirm: string) {
    if (pass_passConfirm === 'password') {
      this.typePassword === 'password' ? this.typePassword = 'text' : this.typePassword = 'password';
    } else {
      this.typePasswordConfirm === 'password' ? this.typePasswordConfirm = 'text' : this.typePasswordConfirm = 'password';
    }
  }

  onSignup() {
    if (this.signeUpForm.valid) {

      const data = {
        username: this.signeUpForm.controls['username'].value,
        email: this.signeUpForm.controls['email'].value,
        password: this.signeUpForm.controls['password'].value,
        passwordConfirm: this.signeUpForm.controls['passwordConfirm'].value,
        link: 'register'
      };

      this.userService.postRequest(data, (callback: any) => {
        console.log('callback', callback);
        if (callback?.data?.status) {
          this.navigationService.goToUrl('/login', {}, callback?.data?.result)
        }
      });

    } else {
      ValidateForm.validateAllFormFields(this.signeUpForm);
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
    let valueEmail = this.signeUpForm.controls['email'].value;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let NoErrorLogin = re.test(valueEmail.trim()) || valueEmail === '';
    if (this.signeUpForm.controls['email'].value.length && !NoErrorLogin) {
      this.errorText = 'Проверьте правильность введённых данных.';
    } else {
      this.errorText = '';
    }
  }
}
