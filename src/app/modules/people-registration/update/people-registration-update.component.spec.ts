import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PeopleRegistrationUpdateComponent} from './people-registration-update.component';
import {PeopleRegistrationService} from '../people-registration.service';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {of, throwError} from 'rxjs';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {Person} from '../../../models/person';

describe('PeopleRegistrationUpdateComponent', () => {
  let component: PeopleRegistrationUpdateComponent;
  let fixture: ComponentFixture<PeopleRegistrationUpdateComponent>;
  let peopleService: PeopleRegistrationService;
  let dialogRef: MatDialogRef<PeopleRegistrationUpdateComponent>;
  let snackBar: MatSnackBar;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        MatSnackBarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule
      ],
      declarations: [PeopleRegistrationUpdateComponent],
      providers: [
        PeopleRegistrationService,
        {provide: MAT_DIALOG_DATA, useValue: {id: 1}},
        {
          provide: MatDialogRef,
          useValue: {close: jasmine.createSpy()}
        },
        MatSnackBar,
        FormBuilder
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleRegistrationUpdateComponent);
    component = fixture.componentInstance;
    peopleService = TestBed.inject(PeopleRegistrationService);
    dialogRef = TestBed.inject(MatDialogRef);
    snackBar = TestBed.inject(MatSnackBar);
    formBuilder = TestBed.inject(FormBuilder);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should patch form with person data on init', () => {
    const person = {
      id: 1,
      name: 'Jin Woo',
      email: 'jinwoo@solo-leveling.com',
      phone: '123456789',
      birthDate: '2000-04-04T00:00:00.000Z'
    } as Person;

    spyOn(peopleService, 'getPerson').and.returnValue(of(person));
    component.ngOnInit();

    expect(peopleService.getPerson).toHaveBeenCalledWith(1);
    expect(component.form.get('name')?.value).toBe(person.name);
    expect(component.form.get('email')?.value).toBe(person.email);
    expect(component.form.get('phone')?.value).toBe(person.phone);
    expect(component.form.get('birthDate')?.value).toBe(person.birthDate);
  });

  it('should submit form and close dialog on success', () => {
    const formValue = {
      name: 'Jin Woo',
      email: 'jinwoo@solo-leveling.com',
      phone: '123456789',
      birthDate: '2000-04-04T00:00:00.000Z'
    };

    component.form.setValue(formValue);

    spyOn(peopleService, 'updatePerson').and.returnValue(of({} as Person));

    component.onSubmit();

    expect(peopleService.updatePerson).toHaveBeenCalledWith(1, formValue as Person);
    expect(dialogRef.close).toHaveBeenCalled();
  });

  it('should show an error snackbar on submit failure', () => {
    const formValue = {
      name: 'Jin Woo',
      email: 'jinwoo@solo-leveling.com',
      phone: '123456789',
      birthDate: '2000-04-04T00:00:00.000Z'
    };

    component.form.setValue(formValue);

    const errorResponse = {error: 'Error updating person'};
    spyOn(peopleService, 'updatePerson').and.returnValue(throwError(errorResponse));
    spyOn(snackBar, 'open');

    component.onSubmit();

    expect(snackBar.open).toHaveBeenCalledWith('Error updating person', 'Fechar', {horizontalPosition: 'start'});
  });

  it('should close dialog on cancel', () => {
    component.onCancel();

    expect(dialogRef.close).toHaveBeenCalled();
  });
});
