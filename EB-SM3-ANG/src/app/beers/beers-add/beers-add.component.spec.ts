import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeersAddComponent } from './beers-add.component';

describe('BeersAddComponent', () => {
  let component: BeersAddComponent;
  let fixture: ComponentFixture<BeersAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeersAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeersAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
