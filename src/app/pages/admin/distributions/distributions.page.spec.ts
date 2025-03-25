import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DistributionsPage} from './distributions.page';

describe('DistributionsPage', () => {
  let component: DistributionsPage;
  let fixture: ComponentFixture<DistributionsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
