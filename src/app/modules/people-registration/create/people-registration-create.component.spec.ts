import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeopleRegistrationCreateComponent } from './people-registration-create.component';
import { PeopleRegistrationService } from '../people-registration.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import {Person} from '../../../models/person';

describe('PeopleRegistrationCreateComponent', () => {
  let component: PeopleRegistrationCreateComponent<any>;
  let fixture: ComponentFixture<PeopleRegistrationCreateComponent<any>>;
  let peopleService: PeopleRegistrationService;
  let dialogRef: MatDialogRef<any>;
  let snackbar: any;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatSnackBarModule,
        MatInputModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatIconModule,
      ],
      declarations: [PeopleRegistrationCreateComponent],
      providers: [PeopleRegistrationService, { provide: MatDialogRef, useValue: {} }, { provide: Router, useValue: {} }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleRegistrationCreateComponent);
    component = fixture.componentInstance;
    peopleService = TestBed.inject(PeopleRegistrationService);
    dialogRef = TestBed.inject(MatDialogRef);
    snackbar = TestBed.inject(MatSnackBar);
    router = TestBed.inject(Router);

    spyOn(peopleService, 'createPerson').and.returnValue(of(
      {
        id: 1,
        name: 'Naruto Uzumaki',
        email: 'naruto@hokage.com',
        phone: '(47)988414130',
        birthDate: '1996-10-25T00:00:00.000Z',
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z'
      }));

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should submit the form and create a new person', () => {
    component.form.setValue({
      name: 'Naruto Uzumaki',
      email: 'naruto@hokage.com',
      phone: '123456789',
      birthDate: '10/10/1999'
    });

    spyOn(dialogRef, 'close');
    component.onSubmit();

    expect(peopleService.createPerson).toHaveBeenCalled();
    expect(dialogRef.close).toHaveBeenCalled();
  });

  it('should show error if form is invalid', () => {
    component.form.setValue({
      name: '',
      email: 'invalid-email',
      phone: '479884',
      birthDate: ''
    });

    spyOn(snackbar, 'open');

    component.onSubmit();

    expect(snackbar.open).toHaveBeenCalledWith('Erro ao cadastrar.', 'Fechar', { horizontalPosition: 'start' });
  });

  it('should call onCancel and close the dialog', () => {
    spyOn(dialogRef, 'close');

    component.onCancel();

    expect(dialogRef.close).toHaveBeenCalled();
  });

  it('should format birthDate correctly when submitted', () => {
    const rawFormValue = {
      name: 'Naruto Uzumaki',
      email: 'naruto@hokage.com',
      phone: '47988414130',
      birthDate: '25/10/1996'
    } as Person;

    const formattedBirthDate = new Date('1996-10-25').toISOString();

    component.form.setValue(rawFormValue);
    component.onSubmit();

    expect(peopleService.createPerson).toHaveBeenCalledWith({
      ...rawFormValue,
      birthDate: formattedBirthDate
    });
  });
});
