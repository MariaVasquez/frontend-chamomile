import { HttpClientModule} from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgToastModule } from 'ng-angular-popup';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, NgToastModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'chamomile';
}
