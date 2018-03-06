import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateNotFoundComponent } from './candidate-not-found.component';

describe('CandidateNotFoundComponent', () => {
  let component: CandidateNotFoundComponent;
  let fixture: ComponentFixture<CandidateNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
