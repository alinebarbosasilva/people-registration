import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Person} from '../../models/person';
import {PaginatedResponse} from '../../models/paginated-response';

@Injectable({
  providedIn: 'root'
})
export class PeopleRegistrationService {
  private readonly http = inject(HttpClient);
  private readonly api = `${environment.api}/persons`;

  getPeople(
    page = 1,
    limit = 10,
    //TODO Comentado pois a API estava dando erro 500 ao enviar os parameters, lembrar.
    // name?: string,
    // sortBy: string = 'name:asc'

  ): Observable<PaginatedResponse<Person>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
    //Comentado pois a API retornava erro 500 ao enviar os parameters
    // .set('sortBy', sortBy)
    // if (name) {
    //   params = params.set('name', name);
    // }

    return this.http.get<PaginatedResponse<Person>>(this.api, {params}).pipe(
      catchError(error => {
        console.error('Erro na requisição:', error);
        return of({results: [], page: 1, limit: limit, count: 0});
      })
    );
  }

  getPerson(id: number): Observable<Person> {
    return this.http.get<Person>(`${this.api}/${id}`);
  }

  createPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.api, person);
  }

  updatePerson(id: number, person: Person): Observable<Person> {
    return this.http.patch<Person>(`${this.api}/${id}`, person);
  }

  deletePerson(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
