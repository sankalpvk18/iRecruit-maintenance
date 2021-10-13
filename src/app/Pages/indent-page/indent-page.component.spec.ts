import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentPageComponent } from './indent-page.component';

describe('IndentPageComponent', () => {
  let component: IndentPageComponent;
  let fixture: ComponentFixture<IndentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndentPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
