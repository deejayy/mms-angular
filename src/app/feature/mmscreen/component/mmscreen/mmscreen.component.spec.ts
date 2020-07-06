import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MmscreenComponent } from './mmscreen.component';

describe('MmscreenComponent', () => {
  let component: MmscreenComponent;
  let fixture: ComponentFixture<MmscreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MmscreenComponent],
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
