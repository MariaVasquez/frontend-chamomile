import { CommonModule, } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, Injector, OnInit, inject } from '@angular/core';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { HeaderComponent } from '../../../shared/header/header.component';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserLogin } from '../../../models/user/UserModel';
import { JWTService } from 'src/app/services/jwt.service';
import { LocalService } from 'src/app/services/crypto/local.service';

import * as Constants from '../../../shared/Constant';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FormsModule, CommonModule, HttpClientModule, ReactiveFormsModule, NgToastModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  loading = false;
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  errorMessage = '';
  screenWidth!: number;
  injector = inject(Injector);
  isSidebarActive = false;
  isHeaderActive = false;

  constructor(
    private userService: UserService,
    private toast: NgToastService,
    private router: Router,
    private storageService: LocalService,
    private jwtService: JWTService,
    private elementRef: ElementRef) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void { }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  submitForm() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.login(this.loginForm.value);
    }
  }

  login(userLogin: any) {
    this.loading = true;

    const observable: Observable<UserLogin> = this.userService.login(userLogin);
    observable.subscribe({
      next: async (resp: any) => {

        const initSession = {
          username: resp.username,
          token: resp.token
        }
        this.storageService.setJsonValue(Constants.USER_TOKEN, initSession.token);
        const decode = this.jwtService.getDecodedAccessToken(initSession.token);
        const authorities = JSON.parse(decode.authorities);
        decode.authorities = authorities;

        const userLogin: UserLogin = decode;
        this.storageService.setJsonValue(Constants.USER_LOGIN, userLogin);
        this.loading = false;
        this.isLoggedIn = true;
        this.showSuccessTopCenter();
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1000);
      }, error: (err) => {
        this.errorMessage = err.error.message;
        this.loading = true;
        this.showError();
      }, complete: () => { }
    });

  }

  reloadPage(): void {
    window.location.reload();
  }

  showSuccessTopCenter() {
    this.toast.success({ detail: "SUCCESS", summary: 'Success login', duration: 15000, position: 'topRight' });
  }

  showError() {
    this.toast.error({ detail: "Error", summary: 'Error in the process, try again later', sticky: true, position: 'topRight' });
  }

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
    this.isHeaderActive = !this.isHeaderActive;
  }
}
