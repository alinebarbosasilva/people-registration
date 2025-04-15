import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeopleRegistrationComponent } from './people-registration.component';
import { PeopleRegistrationService } from './people-registration.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatOptionModule } from '@angular/material/core';
import { PageEvent } from '@angular/material/paginator';
import { Person } from '../../models/person';

describe('PeopleRegistrationComponent', () => {
  let component: PeopleRegistrationComponent;
  let fixture: ComponentFixture<PeopleRegistrationComponent>;
  let peopleService: PeopleRegistrationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        MatDialogModule,
        MatSnackBarModule,
        MatIconModule,
        MatButtonModule,
        MatTableModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatOptionModule,
        PeopleRegistrationComponent,
      ],
      providers: [PeopleRegistrationService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleRegistrationComponent);
    component = fixture.componentInstance;
    peopleService = TestBed.inject(PeopleRegistrationService);

    spyOn(peopleService, 'getPeople').and.returnValue(of({
      results: [{
        id: 1,
        name: 'Jin Woo',
        email: 'jinwoo@solo-leveling.com',
        phone: '123456789',
        birthDate: '1996-25-10T00:00:00.000Z',
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-02T00:00:00.000Z'
      }],
      page: 1,
      limit: 10,
      count: 1
    }));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load people when component is initialized', () => {
    component.reload();
    fixture.detectChanges();

    expect(component.peopleSignal().results.length).toBe(1);
    expect(component.peopleSignal().results[0].name).toBe('Jin Woo');
  });

  it('should create a person', () => {
    const dialogRef = { afterClosed: () => of(true) };
    spyOn(component['dialog'], 'open').and.returnValue(dialogRef as any);
    spyOn(component, 'reload');

    component.createPerson();
    dialogRef.afterClosed().subscribe(() => {
      expect(component.reload).toHaveBeenCalled();
    });
  });

  it('should edit a person', () => {
    const person: Person = {
      id: 1,
      name: 'Jin Woo',
      email: 'jinwoo@solo-leveling.com',
      phone: '47988414130',
      birthDate: '1996-04-04T00:00:00.000Z',
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2025-01-02T00:00:00.000Z'
    };

    const dialogRef = { afterClosed: () => of(true) };
    spyOn(component['dialog'], 'open').and.returnValue(dialogRef as any);
    spyOn(component, 'reload');

    component.editPerson(person);
    dialogRef.afterClosed().subscribe(() => {
      expect(component.reload).toHaveBeenCalled();
    });
  });

  it('should delete a person', () => {
    const person: Person = {
      id: 1,
      name: 'Jin Woo',
      email: 'jinwoo@solo-leveling.com',
      phone: '47988414130',
      birthDate: '1996-04-04T00:00:00.000Z',
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2025-01-02T00:00:00.000Z'
    };

    const dialogRef = { afterClosed: () => of(true) };
    spyOn(component['dialog'], 'open').and.returnValue(dialogRef as any);
    spyOn(component, 'reload');
    spyOn(peopleService, 'deletePerson').and.returnValue(of(undefined));

    component.deletePerson(person);
    dialogRef.afterClosed().subscribe(() => {
      expect(component.reload).toHaveBeenCalled();
    });
  });

  it('should filter people by name and sort by name', () => {
    const formValue = { name: 'Jin Woo', sortBy: 'name:asc' };
    component.filterForm.setValue(formValue);
    fixture.detectChanges();

    expect(component.formValueSignal().name).toBe('Jin Woo');
    expect(component.formValueSignal().sortBy).toBe('name:asc');
  });

  it('should update pageIndex and pageSize on paginator change', () => {
    const paginator: MatPaginator = component.paginator;
    const pageEvent: PageEvent = { pageIndex: 1, pageSize: 10, length: 100 };
    spyOn(component['paginationSignal'], 'set');

    paginator.page.emit(pageEvent);

    expect(component['paginationSignal'].set).toHaveBeenCalledWith({ pageIndex: 1, pageSize: 10 });
  });
});
