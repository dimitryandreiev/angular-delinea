import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CandidatesListComponent } from './candidates-list/candidates-list.component';
import { CandidatesFormComponent } from './candidates-form/candidates-form.component';
import { CandidateNotFoundComponent } from './candidate-not-found/candidate-not-found.component';
import { CandidatesComponent } from './candidates.component';
import { AuthGuard } from '../guards/auth.guard';

const candidatesRoutes = [
    {
        path: 'candidatos', 
        component: CandidatesComponent,
        children: [
            { path: '', component: CandidatesListComponent, canActivate: [AuthGuard] },
            { path: 'naoEncontrado', component: CandidateNotFoundComponent, canActivate: [AuthGuard] },
            { path: 'novo', component: CandidatesFormComponent },
            { path: 'editar/:id', component: CandidatesFormComponent }
        ]
    }
];

@NgModule({
    imports:[
        RouterModule.forChild(candidatesRoutes)
    ],
    exports:[RouterModule]
})

export class candidatesRoutingModule {}