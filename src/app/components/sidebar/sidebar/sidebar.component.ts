import { Component, AfterViewInit, ElementRef } from '@angular/core';
declare var $: any;
import 'malihu-custom-scrollbar-plugin';

interface JQuery {
  mCustomScrollbar(options?: any): JQuery;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']

})
export class SidebarComponent implements AfterViewInit{
  isSidebarActive = false;

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    $(this.elementRef.nativeElement).find('#sidebar').mCustomScrollbar({
      theme: 'minimal'
    });
  }

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
    $('.collapse.in').toggleClass('in');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
  }
}
