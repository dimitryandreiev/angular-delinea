import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatesService } from '../candidates.service';
import { Subscription } from 'rxjs/Subscription';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-candidates-form',
  templateUrl: './candidates-form.component.html',
  styleUrls: ['./candidates-form.component.css']
})
export class CandidatesFormComponent implements OnInit {

  id: number;
  inscription: Subscription
  candidate: any;
  title: String;

  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private router: Router,
    private candidateService: CandidatesService
  ) { }

  ngOnInit() {
    this.title = 'Adicionar';
    this.candidate = [];

    this.inscription = this.route.params.subscribe(
      (params: any) => {
        if (params['id'] != null) {
          this.id = params['id'];

          this.candidate = this.candidateService.getCandidate(this.id);

          if (this.candidate == null) {
            this.router.navigate(['/candidatos/naoEncontrado']);
          }

          this.title = 'Editar';
        }
      }
    );
  }

  ngOnDestroy() {
    this.inscription.unsubscribe();
  }

  onSubmit(candidateForm) {
    this.candidate = JSON.stringify(candidateForm.value);

    this.inscription = this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];

        this.candidate = this.candidateService.getCandidate(this.id);

        if (this.candidate == null) {
          this.candidateService.addCandidate(this.candidate);
        } else {
          this.candidateService.editCandidate(this.candidate, this.id);
        }
      }
    );
  }
}
