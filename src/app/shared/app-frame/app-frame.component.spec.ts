import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFrameComponent } from './app-frame.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppFrameComponent', () => {
  let component: AppFrameComponent;
  let fixture: ComponentFixture<AppFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppFrameComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
