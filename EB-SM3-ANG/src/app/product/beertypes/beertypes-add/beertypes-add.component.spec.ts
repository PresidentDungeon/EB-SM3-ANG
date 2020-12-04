import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeertypesAddComponent } from './beertypes-add.component';

describe('BeertypesAddComponent', () => {
  let component: BeertypesAddComponent;
  let fixture: ComponentFixture<BeertypesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeertypesAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeertypesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
