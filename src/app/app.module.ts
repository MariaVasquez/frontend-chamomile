import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { httpInterceptorProviders } from './helpers/http.interceptor';
import { NgToastModule } from 'ng-angular-popup';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar/sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterOutlet,
    NgToastModule,
    CommonModule,
    SidebarComponent,
    NgbModule
  ],
  providers: [
    provideHttpClient(withFetch()), httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
