import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { User } from './user';

@Injectable()
export class AuthService {

  public token: string;
  private url = 'https://delineaapi.herokuapp.com/o/token/';
  private headers = new Headers( {
    'Content-Type': 'application/x-www-form-urlencoded'
  });
  private options = new RequestOptions({ headers: this.headers });
  private client_id = 'QXBs2sW7qIDTnHpJuFiXQsLWpfyeo9iixK0suvpK';
  private client_secret = 'TmNEOYKR1D5PrNwvGJMyBE2TbZ45OlXLkFgNzdyFsg7FaG3Y7I9njVkWKw4O0IFRRviYzXIDi4ZHem41APoyMDZ4Z1icP1JPEzTxe3uQUFrapy4BLEJXS3hxsqY38ujk';

  private userAuth: boolean = false;
  showMenuEmitter = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private http: Http
  ) { 
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }
  
  authenticServer(user: User) {
    let body = "client_id=" + this.client_id +
      "&client_secret=" + this.client_secret +
      "&grant_type=password" +
      "&username=" + user.userName +
      "&password=" + user.password;

    let teste = this.http.post(this.url, body, this.options)
      .map((res: Response) => res.json())
      .subscribe(result => {
        let token = result.token;

        if (token) {
          this.token = token;
          localStorage.setItem('currentUser', JSON.stringify({ 
            client_id: this.client_id, token: token 
          }));
          //this.makeLogin(user);
          return true;
        } else {
          return false;
        }
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  logout(): void {
      this.token = null;
      localStorage.removeItem('currentUser');
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
