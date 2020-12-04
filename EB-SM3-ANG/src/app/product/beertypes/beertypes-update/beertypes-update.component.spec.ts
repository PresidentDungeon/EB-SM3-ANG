import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeertypesUpdateComponent } from './beertypes-update.component';

describe('BeertypesUpdateComponent', () => {
  let component: BeertypesUpdateComponent;
  let fixture: ComponentFixture<BeertypesUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeertypesUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeertypesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
