import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Candidate } from './candidate';
import 'rxjs/add/operator/map';
import { AuthService } from '../login/auth.service';

@Injectable()
export class CandidatesService {
    candidates: any = [];
    private apiUrl = 'http://delineaapi.herokuapp.com';
    private headers = new Headers({'Content-Type': 'application/json'});
    private options = new RequestOptions ({ headers: this.headers });

    constructor(
        private http: Http,
        private authService: AuthService
    ) { }

    getCandidatesList() {
        let url = this.apiUrl + '/candidate/';
        return this.http.get(url)
            .map((res: Response) => res.json());
    }

    getCandidate(id) {
        let url = this.apiUrl + '/candidate/' + id;

        return this.http.get(url)
            .map((res: Response) => res.json());
    }

    addCandidate(candidate: Candidate) {
        let url = this.apiUrl + '/candidate/';

        return this.http.post(url, JSON.stringify(candidate), this.options)
            .map((res: Response) => res.json())
            .subscribe(data => {
               //@TODO alerta de sucesso
            }, error => {
                console.log(JSON.stringify(error.json()));
            });
    }

    editCandidate(candidate: Candidate, id) {
        let url = this.apiUrl + '/candidate/' + id;

        return this.http.put(url, JSON.stringify(candidate), this.options)
            .map((res: Response) => res.json())
            .subscribe(data => {
                //@TODO alerta de sucesso
            }, error => {
                console.log(JSON.stringify(error.json()));
            });
    }

    removeCandidate(id) {
        let token = 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token;
        let url = this.apiUrl + '/candidate/' + id + '/delete';
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'Authorization': token
        });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(url, id)
            .map((res: Response) => res.json())
            .subscribe(data => {
                //@TODO mensagem de alerta de exclusão
            }, error => {
                console.log(JSON.stringify(error.json()));
            });
    }
}
