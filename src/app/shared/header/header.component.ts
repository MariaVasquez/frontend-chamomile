import {  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LocalService } from 'src/app/services/crypto/local.service';
import * as Constants from '../../shared/Constant';
import { CommonModule } from '@angular/common';
import { FlagService } from 'src/app/services/flag.service';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar/sidebar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, SidebarComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  @Output() sidebarToggle = new EventEmitter<void>();

  firstName: string = "";
  condition: boolean = true;
  isSidebarActive = false;
  isHeaderActive = false;

  @Input() data: any;

  constructor(private storageService: LocalService,
    private flagDataService: FlagService,
    private ref: ChangeDetectorRef,
    private elementRef: ElementRef) { }



  ngOnInit(): void {
    this.setData();
  }

  toggleSidebar() {
    this.sidebarToggle.emit();
  }

  setData() {
    if (this.storageService.getJsonValue(Constants.USER_DATA) == null) {
      this.firstName = "Sign in";
      this.condition = false;
    } else {
      this.firstName = this.storageService.getJsonValue(Constants.USER_DATA).firstName.toUpperCase();
    }
  }

  logout() {
    this.storageService.clearToken();
    window.location.reload();
  }


}
