import {Component, computed, DestroyRef, effect, inject, signal, ViewChild} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule as RFM} from '@angular/forms';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {debounceTime, tap} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

import {PeopleRegistrationService} from './people-registration.service';
import {Person} from '../../models/person';
import {PaginatedResponse} from '../../models/paginated-response';

import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {PeopleRegistrationUpdateComponent} from './update/people-registration-update.component';
import {PeopleRegistrationCreateComponent} from './create/people-registration-create.component';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {ConfirmDialog} from '../../models/confirm-dialog';

import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {PeopleRegistrationTableComponent} from './table/people-registration-table.component';

@Component({
  selector: 'app-people-registration',
  standalone: true,
  imports: [
    CommonModule,
    RFM,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
    DatePipe,
    MatIcon,
    MatButton,
    MatIconButton,
    MatDatepickerModule,
    MatNativeDateModule,
    PeopleRegistrationTableComponent
  ],
  templateUrl: './people-registration.component.html',
  styleUrls: ['./people-registration.component.scss'],
  providers: [MatDatepickerModule]
})
export class PeopleRegistrationComponent {
  private readonly peopleService = inject(PeopleRegistrationService);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  readonly filterForm: FormGroup = this.fb.group({
    name: [''],
    sortBy: ['name:asc']
  });

  readonly formValueSignal = signal(this.filterForm.value);
  readonly paginationSignal = signal<Partial<PageEvent>>({pageIndex: 0, pageSize: 10});

  readonly peopleSignal = signal<PaginatedResponse<Person>>({
    results: [],
    page: 1,
    limit: 10,
    count: 0
  });

  readonly totalCount = computed(() => this.peopleSignal().count);

  readonly filtered = computed(() => {
    const name = this.formValueSignal().name?.toLowerCase() ?? '';
    const sortBy = this.formValueSignal().sortBy;

    const filteredData = this.peopleSignal().results.filter(person =>
      person.name.toLowerCase().includes(name)
    );

    return filteredData.sort((first, second) => {
      if (sortBy === 'name:asc') {
        return first.name.localeCompare(second.name);
      } else if (sortBy === 'name:desc') {
        return second.name.localeCompare(first.name);
      }
      return 0;
    });
  });

  private readonly MESSAGES = {
    createSuccess: 'Cadastro criado com sucesso!',
    deleteSuccess: 'Cadastro excluído com sucesso!',
    updateSuccess: 'Cadastro editado com sucesso!',
    deleteConfirmTitle: 'Excluir cadastro',
    deleteConfirmMessage: `O cadastro será excluído definitivamente.\nVocê tem certeza que deseja continuar?`
  };

  constructor() {
    this.registerPeopleEffect();
    this.registerFormChanges();
  }

  private registerFormChanges(): void {
    this.filterForm.valueChanges
      .pipe(debounceTime(400), takeUntilDestroyed(this.destroyRef))
      .subscribe(value => this.formValueSignal.set(value));
  }

  private registerPeopleEffect(): void {
    effect(() => {
        // API está retornando erro 500 ao enviar os query params --> name e sortBy por isso está comentado.
        // const { name, sortBy } = this.formValueSignal();
        const pagination = this.paginationSignal();

        this.reload(
          pagination.pageIndex,
          pagination.pageSize,
          // name,
          // sortBy
        );
      },
      {allowSignalWrites: true}
    );
  }

  reload(pageIndex: number = 0, pageSize: number = 10, name?: string, sortBy?: string): void {
    this.peopleService.getPeople(pageIndex + 1, pageSize)
      .pipe(
        tap(response => this.peopleSignal.set(response)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  private openPersonDialog(component: any, data: Person | null, successMessage: string): void {
    const dialogRef = this.dialog.open(component, {
      width: '500px',
      panelClass: 'config-dialog',
      data
    });

    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        if (result) {
          this.showSuccessDialog({
            title: successMessage,
            showConfirmButton: false,
            cancelButtonText: 'Fechar',
            cancelButtonClass: 'btn-confirm',
            actionAlign: 'start'
          });
          this.reload();
        }
      });
  }

  createPerson(): void {
    this.openPersonDialog(
      PeopleRegistrationCreateComponent,
      null,
      this.MESSAGES.createSuccess
    );
  }

  editPerson(person: Person): void {
    this.openPersonDialog(
      PeopleRegistrationUpdateComponent,
      person,
      this.MESSAGES.updateSuccess
    );
  }

  deletePerson(person: Person): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      maxHeight: '80vh',
      panelClass: 'success-dialog',
      data: {
        person,
        title: this.MESSAGES.deleteConfirmTitle,
        message: this.MESSAGES.deleteConfirmMessage,
        confirmButtonColor: '.btn-confirm',
        confirmButtonText: 'Excluir',
        cancelButtonColor: '.btn-cancel',
        confirmButtonIcon: 'delete',
        showCancelButton: false
      }
    });

    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        if (result) {
          this.peopleService.deletePerson(person.id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
              next: () => {
                this.showSuccessDialog({
                  title: this.MESSAGES.deleteSuccess,
                  showConfirmButton: false,
                  cancelButtonText: 'Fechar',
                  cancelButtonClass: 'btn-confirm',
                  actionAlign: 'start'
                });
                this.reload();
              },
              error: (err) => {
                this.snackBar.open(
                  err.error.message || 'Erro ao excluir cadastro.',
                  'Fechar',
                  {horizontalPosition: 'start'}
                );
              }
            });
        }
      });
  }

  showSuccessDialog({
                      actionAlign = 'end',
                      title = 'Confirmação',
                      message,
                      confirmButtonText = 'Confirmar',
                      cancelButtonText = 'Cancelar',
                      confirmButtonClass = 'btn-confirm',
                      cancelButtonClass = 'btn-cancel',
                      confirmButtonColor = 'btn-confirm',
                      cancelButtonColor = 'btn-cancel',
                      confirmButtonIcon,
                      cancelButtonIcon,
                      showConfirmButton = true,
                      showCloseButton = true
                    }: Partial<ConfirmDialog> = {}): void {
    this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      maxHeight: '80vh',
      panelClass: 'success-dialog',
      data: {
        actionAlign,
        title,
        message,
        confirmButtonText,
        cancelButtonText,
        confirmButtonClass,
        cancelButtonClass,
        confirmButtonColor,
        cancelButtonColor,
        confirmButtonIcon,
        cancelButtonIcon,
        showConfirmButton,
        showCloseButton
      }
    });
  }
}
