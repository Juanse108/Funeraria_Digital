import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferedPlansComponent } from './offered-plans.component';

describe('OfferedPlansComponent', () => {
  let component: OfferedPlansComponent;
  let fixture: ComponentFixture<OfferedPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferedPlansComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferedPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
