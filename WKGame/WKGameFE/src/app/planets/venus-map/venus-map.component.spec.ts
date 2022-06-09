import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenusMapComponent } from './venus-map.component';

describe('VenusMapComponent', () => {
  let component: VenusMapComponent;
  let fixture: ComponentFixture<VenusMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenusMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VenusMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
