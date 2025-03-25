import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CashRegisterPage} from './cash-register.page';

describe('CashRegisterPage', () => {
  let component: CashRegisterPage;
  let fixture: ComponentFixture<CashRegisterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CashRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
