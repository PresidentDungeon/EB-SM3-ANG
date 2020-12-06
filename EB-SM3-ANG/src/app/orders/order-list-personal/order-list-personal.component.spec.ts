import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListPersonalComponent } from './order-list-personal.component';

describe('OrderListComponent', () => {
  let component: OrderListPersonalComponent;
  let fixture: ComponentFixture<OrderListPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderListPersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderListPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
