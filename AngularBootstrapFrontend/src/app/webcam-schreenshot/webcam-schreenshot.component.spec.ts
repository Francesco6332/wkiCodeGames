import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebcamSchreenshotComponent } from './webcam-schreenshot.component';

describe('WebcamSchreenshotComponent', () => {
  let component: WebcamSchreenshotComponent;
  let fixture: ComponentFixture<WebcamSchreenshotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebcamSchreenshotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebcamSchreenshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
