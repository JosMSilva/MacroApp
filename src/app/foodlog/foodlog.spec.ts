import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Foodlog } from './foodlog';

describe('Foodlog', () => {
  let component: Foodlog;
  let fixture: ComponentFixture<Foodlog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Foodlog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Foodlog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
