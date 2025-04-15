import {Component, Inject, inject, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PeopleRegistrationService} from '../people-registration.service';
import {Person} from '../../../models/person';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxMaskDirective} from 'ngx-mask';
import {FormDateDirective} from '../../../shared/directives/form-date.directive';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';


@Component({
  selector: 'app-update',
  standalone: true,
  imports: [
    MatButton,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule,
    NgxMaskDirective,
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
  templateUrl: './people-registration-update.component.html',
  styleUrl: './people-registration-update.component.scss'
})
export class PeopleRegistrationUpdateComponent implements OnInit {
  id!: number
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

  constructor(@Inject(MAT_DIALOG_DATA)
              public data: { id: number }) {
  }

  onSubmit() {
    if (this.form.valid) {
      this.service.updatePerson(this.data.id, this.form.getRawValue() as any).subscribe({
        next: () => {
          this.dialog.close(this.form.value);
        },
        error: (err) => {
          this.snackbar.open(err.error?.message || 'Erro ao editar.', 'Fechar', {
            horizontalPosition: 'start'
          });
        }
      });
    }
  }

  onCancel() {
    this.dialog.close();
  }

  ngOnInit(): void {
    this.service.getPerson(+this.data.id).subscribe({
      next: (resp) => {
        this.form.patchValue(resp)
      }, error: (err) => this.snackbar.open(err.error?.message, 'Fechar', {horizontalPosition: "start"})
    })
  }
}


