import { Component } from '@angular/core';
import { AuthService } from './login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  showMenu: boolean = false;

  constructor (private authservice: AuthService) { }

  ngOnInit() {

    this.authservice.showMenuEmitter.subscribe(
      show => this.showMenu = show
    );
  }
}
