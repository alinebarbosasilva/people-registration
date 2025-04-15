import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeopleRegistrationUpdateComponent } from './people-registration-update.component';
import { PeopleRegistrationService } from '../people-registration.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Person } from '../../../models/person';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideNgxMask } from 'ngx-mask';

describe('PeopleRegistrationUpdateComponent', () => {
  let component: PeopleRegistrationUpdateComponent;
  let fixture: ComponentFixture<PeopleRegistrationUpdateComponent>;
  let peopleService: PeopleRegistrationService;
  let dialogRef: MatDialogRef<PeopleRegistrationUpdateComponent>;
  let snackBar: MatSnackBar;

  const mockDialogData = { id: 1 };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        provideNgxMask(),
        ReactiveFormsModule,
        MatDialogModule,
        MatSnackBarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        HttpClientTestingModule,
        PeopleRegistrationUpdateComponent
      ],
      providers: [
        PeopleRegistrationService,
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy() } },
        MatSnackBar
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleRegistrationUpdateComponent);
    component = fixture.componentInstance;
    peopleService = TestBed.inject(PeopleRegistrationService);
    dialogRef = TestBed.inject(MatDialogRef);
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should patch form with person data on init', () => {
    const person: Person = {
      id: 1,
      name: 'Jin Woo',
      email: 'jinwoo@solo-leveling.com',
      phone: '(47)988414130',
      birthDate: '2000-04-04T00:00:00.000Z'
    } as Person;

    spyOn(peopleService, 'getPerson').and.returnValue(of(person));
    component.ngOnInit();

    expect(peopleService.getPerson).toHaveBeenCalledWith(mockDialogData.id);
    expect(component.form.get('name')?.value).toBe(person.name);
    expect(component.form.get('email')?.value).toBe(person.email);
    expect(component.form.get('phone')?.value).toBe(person.phone);
    expect(component.form.get('birthDate')?.value).toEqual(new Date(person.birthDate));
  });

  it('should not submit if form is invalid', () => {
    component.form.setValue({
      name: '',
      email: 'invalid-email',
      phone: '',
      birthDate: ''
    });

    spyOn(snackBar, 'open');

    component.onSubmit();

    expect(snackBar.open).toHaveBeenCalledWith(
      'Erro ao atualizar cadastro.',
      'Fechar',
      { horizontalPosition: 'start' }
    );
  });

  it('should submit form and close dialog on success', () => {
    const formValue = {
      name: 'Jin Woo',
      email: 'jinwoo@solo-leveling.com',
      phone: '(47)98841-4130',
      birthDate: new Date('2000-04-04')
    };

    component.form.setValue(formValue);

    const expectedPayload: Person = {
      ...formValue,
      birthDate: formValue.birthDate.toISOString()
    } as Person;

    spyOn(peopleService, 'updatePerson').and.returnValue(of({} as Person));

    component.onSubmit();

    expect(peopleService.updatePerson).toHaveBeenCalledWith(mockDialogData.id, expectedPayload);
    expect(dialogRef.close).toHaveBeenCalled();
  });

  it('should show an error snackbar on submit failure', () => {
    const formValue = {
      name: 'Jin Woo',
      email: 'jinwoo@solo-leveling.com',
      phone: '(47)98841-4130',
      birthDate: new Date('2000-04-04')
    };

    component.form.setValue(formValue);

    spyOn(peopleService, 'updatePerson').and.returnValue(throwError(() => ({
      error: 'Erro no servidor'
    })));
    spyOn(snackBar, 'open');

    component.onSubmit();

    expect(snackBar.open).toHaveBeenCalledWith(
      'Erro no servidor',
      'Fechar',
      { horizontalPosition: 'start' }
    );
  });

  it('should close dialog on cancel', () => {
    component.onCancel();
    expect(dialogRef.close).toHaveBeenCalled();
  });
});
