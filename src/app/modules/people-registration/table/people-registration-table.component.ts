import {Component, input, output} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {Person} from '../../../models/person';
import {ReactiveFormsModule} from '@angular/forms';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {DatePipe} from '@angular/common';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-people-registration-table',
  standalone: true,
  imports: [
    MatIcon,
    ReactiveFormsModule,
    MatPaginator,
    MatTable,
    DatePipe,
    MatIconButton,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatCellDef,
    MatHeaderCellDef,
    MatRowDef
  ],
  templateUrl: './people-registration-table.component.html',
  styleUrl: './people-registration-table.component.scss'
})
export class PeopleRegistrationTableComponent {
  readonly displayedColumns: string[] = ['name', 'email', 'phone', 'birthDate', 'actions'];
  filtered = input.required<Person[]>();
  totalCount = input(0);
  page = output<PageEvent>();

  deletePerson = output<Person>();
  editPerson = output<Person>();


}
