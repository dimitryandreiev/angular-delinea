import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from './user';

@Injectable()
export class AuthService {

  public token: string;
  private url = 'https://delineaapi.herokuapp.com/o/token/';
  private headers = new Headers( {'Content-Type': 'application/json'});
  private options = new RequestOptions({ headers: this.headers });
  private client_id = ' Rb6yDNb6muY6Wr9iGybl193VzO6BqOuleLGblg14 ';
  private client_secret = ' NjsLaIedGub9LC2xAKHIt7kiN4DiSBLolT74w2PYrOu4PPdRxCNqgZDLS1UlqwSQry2HSmRj2 1MWcOiKOuLq8UtsD0LBic26SxJAEHqf7AaZ5C6sOSG9WrHf3gOzJkmY  ';

  private userAuth: boolean = false;
  showMenuEmitter = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private http: Http
  ) { 
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }
  
  getUser() {
    return this.http
      .get(`http://delineaapi.herokuapp.com/`)
      .map((res:Response) => res.json());
  }

  profile = {};

  authenticServer(user: User) {
    let body = JSON.stringify(
      {
         client_id: this.client_id, 
         client_secret: this.client_secret
      }
    );

    return this.http.post(this.url, body, this.options)
      .map((response: Response) => {
        let token = response.json() && response.json().token;
        console.log('entrando');

        if (token) {
          this.token = token;
          localStorage.setItem('currentUser', JSON.stringify({ 
            client_id: this.client_id, token: token 
          }));

          //login OK
          //this.makeLogin(user);
          return true;
        } else {
          // don't do login
          return false;
        }
    });
  }

  logout(): void {
      this.token = null;
      localStorage.removeItem('currentUser');
  }

  makeLogin(user: User) {
    let login_client_id = '???';
    let login_client_secret = '???';
    let loginHeaders = new Headers( {'Content-Type': 'application/x-www-form-urlencoded'});
    let loginOptions = new RequestOptions({ headers: loginHeaders });
    let body = JSON.stringify(
      {
         client_id: this.client_id, 
         client_secret: this.client_secret,
         grant_type:'password', 
         username: user.userName, 
         password: user.password, 
      }
    );

    //@Fazer lógica de verificação de conexão com server
    /*if (conection) {

      this.userAuth = true;

      this.showMenuEmitter.emit(true);

      this.router.navigate(['/']);

    } else {
      this.userAuth = false;

      this.showMenuEmitter.emit(false);
    }*/
  }

  login(user: User) {
    if (user.userName === 'teste@delinea.com' &&
      user.password === '123'
    ) {

      this.userAuth = true;

      this.showMenuEmitter.emit(true);

      this.router.navigate(['/']);

    } else {
      this.userAuth = false;

      this.showMenuEmitter.emit(false);
    }
  }

  userIsAuth() {
    return this.userAuth;
  }

  public handleError (error: any) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
