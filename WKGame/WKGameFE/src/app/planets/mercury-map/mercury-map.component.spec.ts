import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MercuryMapComponent } from './mercury-map.component';

describe('MercuryMapComponent', () => {
  let component: MercuryMapComponent;
  let fixture: ComponentFixture<MercuryMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MercuryMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MercuryMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
