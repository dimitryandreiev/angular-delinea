import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CandidatesComponent } from './candidates.component';
import { CandidatesListComponent } from './candidates-list/candidates-list.component';
import { CandidatesService } from './candidates.service';
import { CandidatesFormComponent } from './candidates-form/candidates-form.component';
import { CandidateNotFoundComponent } from './candidate-not-found/candidate-not-found.component';
import { candidatesRoutingModule } from './candidates.routing.module';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    candidatesRoutingModule,
    HttpModule
  ],
  declarations: [
    CandidatesComponent,
    CandidatesListComponent,
    CandidatesFormComponent,
    CandidateNotFoundComponent
  ],
  exports: [
    CandidatesComponent
  ],
  providers: [
    CandidatesService
  ]
})
export class CandidatesModule { }
