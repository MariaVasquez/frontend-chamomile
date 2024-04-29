import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../models/user/UserModel';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { Observable } from 'rxjs';;
import { HttpClientModule } from '@angular/common/http';
import Validation from '../../../shared/Validation';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [HeaderComponent, FormsModule, CommonModule, HttpClientModule, ReactiveFormsModule, NgToastModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss'
})
export class RegisterUserComponent implements OnInit {
[x: string]: any;
  user: User = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    repeatPassword: ''
  };
  userForm: FormGroup;
  submitted = false;

  loading = false;


  constructor(
    private userService: UserService,
    private toast: NgToastService,
    private router: Router) {
    this.userForm = new FormGroup({
      username: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      password: new FormControl('',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40),
        ],),
      repeatPassword: new FormControl('', Validators.required)
    }, { validators: Validation.match('password', 'repeatPassword') });
  }
  ngOnInit(): void {
  }

  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  passwordsMatch() {
    return this.user.password === this.user.repeatPassword;
  }

  submitForm() {
    this.submitted = true;
    if (this.userForm.valid) {
      delete this.user.repeatPassword;
      delete this.userForm.value.repeatPassword;
      this.register(this.userForm.value);
    }
  }

  register(user: User) {
    this.loading = true;
    const observable: Observable<User> = this.userService.saveUser(user);
    observable.subscribe({
      next: async (resp: any) => {
        console.log(resp);
        this.showSuccess(resp.responseMessage);
        this.loading = false;
        this.userForm.reset();
        this.router.navigate(['/login']);
      }, error: (err) => {
        this.showError();
      }, complete: () => { }
    });
  }
  showSuccess(summary: string) {
    this.toast.success({ detail: "Success", summary: summary, duration: 5000, position: 'topRight' });
  }

  showError() {
    this.toast.error({ detail: "Error", summary: 'Error in the process, try again later', sticky: true, position: 'topRight' });
  }
}
