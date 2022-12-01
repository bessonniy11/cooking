import {Component, OnInit} from '@angular/core';
import {NavigationService} from '../../services/navigation.service';
import {UserService} from "../../services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import ValidateForm from "../../helpers/validateform";

@Component({
  selector: 'create',
  templateUrl: 'page.html',
  styleUrls: ['page.scss']
})
export class CreatePage implements OnInit {
  fb: FormBuilder;
  userService: UserService;
  navigationService: NavigationService;

  newDishForm!: FormGroup;
  errorText: string = '';

  constructor(
    fb: FormBuilder,
    userService: UserService,
    navigationService: NavigationService,
  ) {
    this.fb = fb;
    this.userService = userService;
    this.navigationService = navigationService;
  }

  ngOnInit(): void {
    this.newDishForm = this.fb.group({
      name: ['', Validators.required],
      desc: ['', Validators.required],
    });
  }

  ngAfterViewInit() {
  }

  ionViewWillEnter() {

  }

  onSubmit() {
    console.log('this.newDishForm', this.newDishForm);
  }

  keyLogin() {
    // if (this.newDishForm.controls['name'].value.length < 1) {
    //   this.errorText = 'Это поле не может быть пустым'
    // }
  }
}
