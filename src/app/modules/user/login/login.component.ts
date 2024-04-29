import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { HeaderComponent } from '../../../shared/header/header.component';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FormsModule, CommonModule, HttpClientModule, ReactiveFormsModule, NgToastModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;
  submitted = false;

  loading = false;

  constructor(
    private userService: UserService,
    private toast: NgToastService,
    private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  submitForm() {
    this.submitted = true;
    if (this.loginForm.valid) {
      console.log('Formulario válido. Datos:', this.loginForm);
    }
  }

}
