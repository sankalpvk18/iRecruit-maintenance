import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentDetailsPageComponent } from './indent-details-page.component';

describe('IndentDetailsPageComponent', () => {
  let component: IndentDetailsPageComponent;
  let fixture: ComponentFixture<IndentDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndentDetailsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndentDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
