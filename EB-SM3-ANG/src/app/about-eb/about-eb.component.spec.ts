import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutEBComponent } from './about-eb.component';

describe('AboutEBComponent', () => {
  let component: AboutEBComponent;
  let fixture: ComponentFixture<AboutEBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutEBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutEBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
