import { Component, OnInit } from '@angular/core';
import { CandidatesService } from '../candidates.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.css']
})
export class CandidatesListComponent implements OnInit {

  title: string = "Lista de candidatos";
  candidatesList: any = [];
  id: number;

  constructor(
    private candidatesService: CandidatesService,
    private router: Router
  ) { 
    this.candidatesList = this.candidatesService.getCandidatesList();
  }

  ngOnInit() {
  }

  editCandidate (id) {
    this.router.navigate (['/candidatos/editar', id]);
  }

  addCandidate () {
    this.router.navigate (['/candidatos/novo']);
  }

  deleteCandidate (id) {
    this.candidatesService.removeCandidate(id);
  }

}
