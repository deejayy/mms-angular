import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MmscreenComponent } from './mmscreen.component';
import { MemberSetComponent } from '../member-set/member-set.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddUserModalComponent } from '../add-user-modal/add-user-modal.component';
import { CoreModule } from '@app/core/core.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterTestingModule } from '@angular/router/testing';

describe('MmscreenComponent', () => {
  let component: MmscreenComponent;
  let fixture: ComponentFixture<MmscreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MmscreenComponent, MemberSetComponent, AddUserModalComponent],
      imports: [ReactiveFormsModule, CoreModule, StoreModule.forRoot({} as any), EffectsModule.forRoot([]), RouterTestingModule],
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
