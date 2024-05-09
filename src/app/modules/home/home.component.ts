import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { LocalService } from 'src/app/services/crypto/local.service';
import * as Constants from '../../shared/Constant';
import { ProductComponent } from '../product/product.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  data: any;
  isSidebarActive = false;
  isHeaderActive = false;

  constructor(private userService: UserService,
    private storageService: LocalService) { }

  ngOnInit(): void {
    this.getUser();

  }

  getUser() {
    const token = this.storageService.getJsonValue(Constants.USER_TOKEN);
    if (token != null) {
      if (this.storageService.getJsonValue(Constants.USER_DATA) == null) {
        const observable: Observable<any> = this.userService.getUser(token, this.storageService.getJsonValue(Constants.USER_LOGIN).username);
        observable.subscribe({
          next: async (resp: any) => {
            this.storageService.setJsonValue(Constants.USER_DATA, resp.data);
            window.location.reload();
          }
        });
      }
    }

  }

  reloadPage(): void {
    window.location.reload();
  }

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
    this.isHeaderActive = !this.isHeaderActive;
  }


}
