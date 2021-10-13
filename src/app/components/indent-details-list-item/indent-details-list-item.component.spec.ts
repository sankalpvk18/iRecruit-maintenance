import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentDetailsListItemComponent } from './indent-details-list-item.component';

describe('IndentDetailsListItemComponent', () => {
  let component: IndentDetailsListItemComponent;
  let fixture: ComponentFixture<IndentDetailsListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndentDetailsListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndentDetailsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
