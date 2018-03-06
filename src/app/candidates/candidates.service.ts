import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { Candidate } from './candidate';
import 'rxjs/add/operator/map';
import { AuthService } from '../login/auth.service';

@Injectable()
export class CandidatesService {
  candidates: any = [];
  private apiUrl = 'http://delineaapi.herokuapp.com/';
  /*private token = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token;
  private headers = new Headers(
    { 
      'Content-Type': 'application/json', 
      'Authorization': this.token 
    }
  );
  private options = new RequestOptions({ headers: this.headers });*/

  constructor(
    private http: Http,
    private authService: AuthService
  ) { }

  getCandidatesList() {
    //@TODO pegar do servidor os candidatos
    /*this.candidates = this.http.get(this.apiUrl  + '/candidatos' + id;)
		 	.toPromise()
		 	.then(response => response.json())
		 	.catch(this.handleError);*/
    
    this.candidates = [
      {
          id: "1",
          fullName: "Dimitry",
          rg: '235.279.55',
          birthday: '19/03/1986',
          phone: '(48) 9967-24274',
          user: 'try',
          email: 'djmcliff3@gmail.com',
          password: 'babooshka'
      },
      {
          id: "2",
          fullName: "Xablau",
          rg: '111.111.55',
          birthday: '19/03/1986',
          phone: '(48) 9967-24274',
          user: 'Xablau',
          email: 'xablau@gmail.com',
          password: 'xablooshka'                        
      },
      {
          id: "3",
          fullName: "Dimitry Andreiev",
          rg: '111.222.55',
          birthday: '19/03/1986',
          phone: '(48) 9967-24274',
          user: 'Dimy',
          email: 'dimy3@gmail.com',
          password: 'dimidimi'                        
      }
    ];

    return this.candidates;
  }

  getCandidate(id: number) {
    //@TODO fazer lógica de buscar cancidato pelo servidor
    /*let candidate = this.http.get(this.apiUrl  + '/candidato/' + id;)
		 	.toPromise()
		 	.then(response => response.json())
		 	.catch(this.handleError);*/

    let candidates = this.getCandidatesList();

    for (let i=0; i< candidates.length; i++) {
      let candidate = candidates[i];

      if (candidate.id == id) {
        return candidate;
      }
    }

    return null;
  }

  addCandidate(candidate: Candidate) {
    //@TODO fazer lógica para adicionar candidato
    /*let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions ({ headers: headers });

    return this.http.post(this.apiUrl, candidate, options)
		 	.toPromise()
		 	.then(res => res.json());*/
  }

  editCandidate(candidate: Candidate, id) {
    //@TODO fazer lógica para editar candidato
	 	/*delete candidate.id;
	 	let headers = new Headers({ 'Content-Type': 'application/json' });
	 	let options = new RequestOptions({ headers: headers });
 
    let url = this.apiUrl + '/' + id;

	 	return this.http.put(url, candidate, options)
		 	.toPromise()
		 	.then(res => res.json());*/
  }

  removeCandidate(id: number) {
    let candidates = this.getCandidatesList();

    for (let i=0; i< this.candidates.length; i++) {
      let candidate = this.candidates[i];

      if (candidate.id == id) {
        this.candidates.splice(i, 1);
      }
    }
  
    //@TODO fazer lógica para excluir candidato
	 	/*return this.http.delete(this.apiUrl + '/' + id)
		 	.toPromise()
		 	.then(res => res.json().data)
		 	.catch(this.handleError);*/
  }
}
