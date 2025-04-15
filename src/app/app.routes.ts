import { Routes } from '@angular/router';
import {PeopleRegistrationComponent} from './modules/people-registration/people-registration.component';


export const routes: Routes = [
  { path: '', redirectTo: 'people-registration', pathMatch: 'full' },
  { path: 'people-registration', component: PeopleRegistrationComponent },
  { path: '**', redirectTo: 'people-registration' }
];
