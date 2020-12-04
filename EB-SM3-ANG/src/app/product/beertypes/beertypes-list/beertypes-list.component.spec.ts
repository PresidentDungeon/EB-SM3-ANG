import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeertypesListComponent } from './beertypes-list.component';

describe('BeertypesListComponent', () => {
  let component: BeertypesListComponent;
  let fixture: ComponentFixture<BeertypesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeertypesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeertypesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
