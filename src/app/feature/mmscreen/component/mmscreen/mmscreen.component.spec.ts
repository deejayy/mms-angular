import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MmscreenComponent } from './mmscreen.component';
import { MemberSetComponent } from '../member-set/member-set.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('MmscreenComponent', () => {
  let component: MmscreenComponent;
  let fixture: ComponentFixture<MmscreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MmscreenComponent, MemberSetComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
