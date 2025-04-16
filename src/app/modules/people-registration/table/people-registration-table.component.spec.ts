import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleRegistrationTableComponent } from './people-registration-table.component';

describe('PeopleRegistrationTableComponent', () => {
  let component: PeopleRegistrationTableComponent;
  let fixture: ComponentFixture<PeopleRegistrationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeopleRegistrationTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeopleRegistrationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
