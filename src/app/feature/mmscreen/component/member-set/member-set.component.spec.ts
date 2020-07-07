import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberSetComponent } from './member-set.component';

describe('MemberSetComponent', () => {
  let component: MemberSetComponent;
  let fixture: ComponentFixture<MemberSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MemberSetComponent],
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
