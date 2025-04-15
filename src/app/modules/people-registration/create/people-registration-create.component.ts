import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {PeopleRegistrationService} from '../people-registration.service';
import {NgxMaskDirective} from 'ngx-mask';
import {JsonPipe} from '@angular/common';
import {FormDateDirective} from '../../../shared/directives/form-date.directive';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDatepickerModule,
    NgxMaskDirective,
    JsonPipe,
    FormDateDirective
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'DD/MM/YYYY',
        },
        display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      }
    },
  ],
  templateUrl: './people-registration-create.component.html',
  styleUrl: './people-registration-create.component.scss'
})
export class PeopleRegistrationCreateComponent<Person> {
  service = inject(PeopleRegistrationService);
  dialog = inject(MatDialogRef<Person>);
  snackbar = inject(MatSnackBar);
  fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    birthDate: ['', Validators.required]
  });

  onSubmit() {
    if (this.form.valid) {
    const rawFormValue = this.form.getRawValue();

    const payload = {...rawFormValue};

    if (payload.birthDate) {
      if (typeof payload.birthDate === 'string') {
        const parts = payload.birthDate.split('/');
        if (parts.length === 3) {
          const formatted = `${parts[2]}-${parts[1]}-${parts[0]}`;
          payload.birthDate = new Date(formatted).toISOString();
        }
      } else if (payload.birthDate instanceof Date) {
        payload.birthDate = payload.birthDate.toISOString();
      }
    }

    this.service.createPerson(payload).subscribe({
      next: () => {
        this.dialog.close(this.form.value);
      },
      error: (err) => {
        this.snackbar.open(err.error?.message || 'Erro ao cadastrar.', 'Fechar', {
          horizontalPosition: 'start'
        });
      }
    });
    }
  }

  onCancel() {
    this.dialog.close();
  }
}
