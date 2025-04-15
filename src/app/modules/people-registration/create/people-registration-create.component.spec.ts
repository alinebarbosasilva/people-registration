import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleRegistrationService } from '../people-registration.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Person } from '../../../models/person';
import { MatInputModule } from '@angular/material/input';
import {PeopleRegistrationComponent} from '../people-registration.component';

describe('PeopleRegistrationComponent', () => {
  let component: PeopleRegistrationComponent;
  let fixture: ComponentFixture<PeopleRegistrationComponent>;
  let peopleService: PeopleRegistrationService;
  let snackbar: jasmine.SpyObj<MatSnackBar>;

  const mockPeople: Person[] = [
    {
      id: 1,
      name: 'Naruto Uzumaki',
      email: 'naruto@hokage.com',
      phone: '(47)988414130',
      birthDate: '1996-10-25T00:00:00.000Z',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z'
    },
    {
      id: 2,
      name: 'Sasuke Uchiha',
      email: 'sasuke@uchiha.com',
      phone: '(47)988414131',
      birthDate: '1996-07-23T00:00:00.000Z',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PeopleRegistrationComponent,
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatSnackBarModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatInputModule
      ],
      providers: [
        PeopleRegistrationService,
        { provide: MatDialogRef, useValue: jasmine.createSpyObj('MatDialogRef', ['close']) },
        { provide: MatSnackBar, useValue: jasmine.createSpyObj('MatSnackBar', ['open']) }
      ]
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleRegistrationComponent);
    component = fixture.componentInstance;
    peopleService = TestBed.inject(PeopleRegistrationService);
    snackbar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;

    spyOn(peopleService, 'getPeople').and.returnValue(of({ results: mockPeople, page: 1, limit: 10, count: mockPeople.length }));
    spyOn(peopleService, 'deletePerson').and.returnValue(of(void 0));
    spyOn(peopleService, 'updatePerson').and.returnValue(of(mockPeople[0]));
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // it('should reload people when component is initialized', () => {
  //   component.ngOnInit();
  //   expect(peopleService.getPeople).toHaveBeenCalled();
  //   expect(component.people).toEqual(mockPeople);
  // });
  //
  // it('should filter people by name and sort by name', () => {
  //   component.filterByName('Naruto');
  //   expect(component.filteredPeople.length).toBe(1);
  //   expect(component.filteredPeople[0].name).toBe('Naruto Uzumaki');
  //
  //   component.sortByName();
  //   expect(component.filteredPeople[0].name).toBe('Naruto Uzumaki');
  // });

  it('should create a person', () => {
    component.createPerson();
    expect(peopleService.createPerson).toHaveBeenCalled();
    expect(snackbar.open).toHaveBeenCalledWith('Pessoa criada com sucesso!', 'Fechar', { horizontalPosition: 'start' });
  });

  it('should edit a person', () => {
    component.editPerson(mockPeople[0]);
    expect(peopleService.updatePerson).toHaveBeenCalledWith(mockPeople[0].id, mockPeople[0]);
  });

  it('should delete a person', () => {
    component.deletePerson(mockPeople[0]);
    expect(peopleService.deletePerson).toHaveBeenCalledWith(mockPeople[0].id);
    expect(snackbar.open).toHaveBeenCalledWith('Pessoa excluída com sucesso!', 'Fechar', { horizontalPosition: 'start' });
  });
});
