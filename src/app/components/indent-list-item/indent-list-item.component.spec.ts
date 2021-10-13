import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentListItemComponent } from './indent-list-item.component';

describe('IndentListItemComponent', () => {
  let component: IndentListItemComponent;
  let fixture: ComponentFixture<IndentListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndentListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndentListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
