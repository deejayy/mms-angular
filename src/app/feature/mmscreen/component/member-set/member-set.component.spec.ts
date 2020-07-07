import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberSetComponent } from './member-set.component';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

describe('MemberSetComponent', () => {
  let component: MemberSetComponent;
  let fixture: ComponentFixture<MemberSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MemberSetComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
