import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, delay, Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Person} from '../../models/person';
import {PaginatedResponse} from '../../models/paginated-response';

@Injectable({
  providedIn: 'root'
})
export class PeopleRegistrationService {
  private readonly http = inject(HttpClient);
  private readonly api = `${environment.api}/persons`;

  // getPeople(
  //   page = 1,
  //   limit = 10,
  //   //TODO Comentado pois a API estava dando erro 500 ao enviar os parameters, lembrar.
  //   // name?: string,
  //   // sortBy: string = 'name:asc'
  //
  // ): Observable<PaginatedResponse<Person>> {
  //   let params = new HttpParams()
  //     .set('page', page.toString())
  //     .set('limit', limit.toString())
  //   //Comentado pois a API retornava erro 500 ao enviar os parameters
  //   // .set('sortBy', sortBy)
  //   // if (name) {
  //   //   params = params.set('name', name);
  //   // }
  //
  //   return this.http.get<PaginatedResponse<Person>>(this.api, {params}).pipe(
  //     catchError(error => {
  //       console.error('Erro na requisição:', error);
  //       return of({results: [], page: 1, limit: limit, count: 0});
  //     })
  //   );
  // }

  // getPerson(id: number): Observable<Person> {
  //   return this.http.get<Person>(`${this.api}/${id}`);
  // }

  createPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.api, person);
  }

  updatePerson(id: number, person: Person): Observable<Person> {
    return this.http.patch<Person>(`${this.api}/${id}`, person);
  }

  deletePerson(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  private readonly USE_MOCK = true

  getPeople(page: number, limit: number): Observable<PaginatedResponse<Person>> {
    if (this.USE_MOCK) {
      const mockData: PaginatedResponse<Person> = {
        results: [
          {
            id: 73,
            email: "email2@teste.com",
            name: "Teste",
            phone: "123456789",
            birthDate: "2024-11-18T09:02:40.805Z",
            createdAt: "2023-11-23T11:37:59.799Z",
            updatedAt: "2024-11-18T12:02:41.224Z"
          },
          {
            id: 105,
            email: "bruno@gmail.com",
            name: "Bruno",
            phone: "48991229146",
            birthDate: "2023-12-30T00:00:00.000Z",
            createdAt: "2023-12-05T12:36:16.881Z",
            updatedAt: "2023-12-05T12:36:16.881Z"
          },
          {
            id: 170,
            email: "teste@gmail.com",
            name: "Pedro Curti",
            phone: "(99) 99999-9990",
            birthDate: "2023-11-28T00:00:00.000Z",
            createdAt: "2024-11-14T22:45:13.875Z",
            updatedAt: "2024-11-18T11:47:16.592Z"
          },
          {
            id: 174,
            email: "pedro.curti@email.com.br",
            name: "Pedro Curti",
            phone: "(44) 99999-9999",
            birthDate: "1997-05-23T00:00:00.000Z",
            createdAt: "2024-11-18T12:09:39.202Z",
            updatedAt: "2024-11-18T12:09:39.202Z"
          },
          {
            id: 208,
            email: "asdsdsada@gmail.com",
            name: "guilherme",
            phone: "(99) 00000-0000",
            birthDate: "2020-07-21T17:32:28.000Z",
            createdAt: "2024-11-18T14:28:23.859Z",
            updatedAt: "2024-11-25T12:57:34.608Z"
          },
          {
            id: 265,
            email: "teste@mail.com",
            name: "teobaldo",
            phone: "(27) 99999-9999",
            birthDate: "2024-11-25T00:00:00.000Z",
            createdAt: "2024-11-25T03:00:18.676Z",
            updatedAt: "2024-11-25T03:00:18.676Z"
          },
          {
            id: 299,
            email: "guioff@email.com",
            name: "gui off",
            phone: "(99) 99999-9998",
            birthDate: "2024-11-25T03:00:00.000Z",
            createdAt: "2024-11-25T16:51:01.838Z",
            updatedAt: "2024-11-25T16:51:01.838Z"
          },
          {
            id: 301,
            email: "mikasa@scouts.jp",
            name: "Mikasa Ackerman",
            phone: "(11) 11111-1111",
            birthDate: "2001-02-10T00:00:00.000Z",
            createdAt: "2024-01-10T09:00:00.000Z",
            updatedAt: "2024-01-10T09:00:00.000Z"
          },
          {
            id: 302,
            email: "hinata@konoha.jp",
            name: "Hinata Hyuga",
            phone: "(22) 22222-2222",
            birthDate: "1995-12-27T00:00:00.000Z",
            createdAt: "2024-02-15T10:30:00.000Z",
            updatedAt: "2024-02-15T10:30:00.000Z"
          },
          {
            id: 303,
            email: "nezuko@demon.jp",
            name: "Nezuko Kamado",
            phone: "(33) 33333-3333",
            birthDate: "2005-08-19T00:00:00.000Z",
            createdAt: "2024-03-20T14:45:00.000Z",
            updatedAt: "2024-03-20T14:45:00.000Z"
          },
          {
            id: 304,
            email: "bulma@capsulecorp.jp",
            name: "Bulma Briefs",
            phone: "(44) 44444-4444",
            birthDate: "1980-07-15T00:00:00.000Z",
            createdAt: "2024-04-01T08:15:00.000Z",
            updatedAt: "2024-04-01T08:15:00.000Z"
          },
          {
            id: 305,
            email: "nobara@jujutsu.jp",
            name: "Nobara Kugisaki",
            phone: "(55) 55555-5555",
            birthDate: "2003-11-07T00:00:00.000Z",
            createdAt: "2024-04-10T12:00:00.000Z",
            updatedAt: "2024-04-10T12:00:00.000Z"
          },
          {
            id: 306,
            email: "android18@dbz.jp",
            name: "Android 18",
            phone: "(66) 66666-6666",
            birthDate: "1988-06-01T00:00:00.000Z",
            createdAt: "2024-04-11T16:20:00.000Z",
            updatedAt: "2024-04-11T16:20:00.000Z"
          },
          {
            id: 307,
            email: "asuna@saovr.jp",
            name: "Asuna Yuuki",
            phone: "(77) 77777-7777",
            birthDate: "2002-09-30T00:00:00.000Z",
            createdAt: "2024-04-11T17:45:00.000Z",
            updatedAt: "2024-04-11T17:45:00.000Z"
          }
        ],
        page: page,
        limit: limit,
        count: 14
      };

      return of(mockData).pipe(delay(400));
    }
    return this.http.get<PaginatedResponse<Person>>(`https://dev-api-plt.4asset.net.br/exam/v1/persons?page=${page}&limit=${limit}`);
  }


  getPerson(id: number): Observable<Person> {
    if (this.USE_MOCK) {
      const mockPerson: Person = {
        id,
        name: "Nezuko Kamado",
        email: "nezuko@demon.jp",
        phone: "(33) 33333-3333",
        birthDate: "2005-08-19T00:00:00.000Z",
        createdAt: "2024-03-20T14:45:00.000Z",
        updatedAt: new Date().toISOString()
      };

      return of(mockPerson).pipe(delay(300));
    }

    return this.http.get<Person>(`${this.api}/${id}`);
  }
}
