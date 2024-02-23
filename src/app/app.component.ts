import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SPINNER } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  spinner = SPINNER;
  constructor(private title: Title){
    this.title.setTitle(`${environment.appName} ${environment.version}`);
  }
}
