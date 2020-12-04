import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeersUpdateComponent } from './beers-update.component';

describe('BeersUpdateComponent', () => {
  let component: BeersUpdateComponent;
  let fixture: ComponentFixture<BeersUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeersUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeersUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
