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
            id: 1,
            email: "ana.silva@email.com",
            name: "Ana Silva",
            phone: "(11) 91234-5678",
            birthDate: "1990-03-10T00:00:00.000Z",
            createdAt: "2023-11-23T11:37:59.799Z",
            updatedAt: "2024-11-18T12:02:41.224Z"
          },
          {
            id: 2,
            email: "bruno.souza@gmail.com",
            name: "Bruno Souza",
            phone: "(21) 99876-5432",
            birthDate: "1988-06-15T00:00:00.000Z",
            createdAt: "2023-12-05T12:36:16.881Z",
            updatedAt: "2023-12-05T12:36:16.881Z"
          },
          {
            id: 3,
            email: "carla.menezes@email.com",
            name: "Carla Menezes",
            phone: "(31) 98765-4321",
            birthDate: "1995-01-25T00:00:00.000Z",
            createdAt: "2024-11-14T22:45:13.875Z",
            updatedAt: "2024-11-18T11:47:16.592Z"
          },
          {
            id: 4,
            email: "daniel.almeida@email.com",
            name: "Daniel Almeida",
            phone: "(41) 91234-9999",
            birthDate: "1992-11-12T00:00:00.000Z",
            createdAt: "2024-11-18T12:09:39.202Z",
            updatedAt: "2024-11-18T12:09:39.202Z"
          },
          {
            id: 5,
            email: "eduarda.matos@gmail.com",
            name: "Eduarda Matos",
            phone: "(61) 99900-1111",
            birthDate: "1998-04-09T00:00:00.000Z",
            createdAt: "2024-11-18T14:28:23.859Z",
            updatedAt: "2024-11-25T12:57:34.608Z"
          },
          {
            id: 6,
            email: "fabio.teixeira@mail.com",
            name: "Fábio Teixeira",
            phone: "(62) 98765-0000",
            birthDate: "1985-02-20T00:00:00.000Z",
            createdAt: "2024-11-25T03:00:18.676Z",
            updatedAt: "2024-11-25T03:00:18.676Z"
          },
          {
            id: 7,
            email: "gabriela.ferreira@email.com",
            name: "Gabriela Ferreira",
            phone: "(71) 98888-2222",
            birthDate: "2000-08-30T00:00:00.000Z",
            createdAt: "2024-11-25T16:51:01.838Z",
            updatedAt: "2024-11-25T16:51:01.838Z"
          },
          {
            id: 8,
            email: "henrique.santos@email.com",
            name: "Henrique Santos",
            phone: "(81) 99876-3333",
            birthDate: "1993-05-05T00:00:00.000Z",
            createdAt: "2024-01-10T09:00:00.000Z",
            updatedAt: "2024-01-10T09:00:00.000Z"
          },
          {
            id: 9,
            email: "isabela.rocha@email.com",
            name: "Isabela Rocha",
            phone: "(91) 93333-4444",
            birthDate: "2002-07-19T00:00:00.000Z",
            createdAt: "2024-02-15T10:30:00.000Z",
            updatedAt: "2024-02-15T10:30:00.000Z"
          },
          {
            id: 10,
            email: "joao.victor@email.com",
            name: "João Victor",
            phone: "(82) 92222-5555",
            birthDate: "1996-10-22T00:00:00.000Z",
            createdAt: "2024-03-20T14:45:00.000Z",
            updatedAt: "2024-03-20T14:45:00.000Z"
          },
          {
            id: 11,
            email: "karina.lima@email.com",
            name: "Karina Lima",
            phone: "(85) 90011-2233",
            birthDate: "1999-12-02T00:00:00.000Z",
            createdAt: "2024-04-01T08:15:00.000Z",
            updatedAt: "2024-04-01T08:15:00.000Z"
          },
          {
            id: 12,
            email: "leonardo.nogueira@email.com",
            name: "Leonardo Nogueira",
            phone: "(47) 98899-6677",
            birthDate: "1987-01-18T00:00:00.000Z",
            createdAt: "2024-04-10T12:00:00.000Z",
            updatedAt: "2024-04-10T12:00:00.000Z"
          },
          {
            id: 13,
            email: "mariana.pires@email.com",
            name: "Mariana Pires",
            phone: "(31) 95555-8888",
            birthDate: "1994-03-28T00:00:00.000Z",
            createdAt: "2024-04-11T16:20:00.000Z",
            updatedAt: "2024-04-11T16:20:00.000Z"
          },
          {
            id: 14,
            email: "nicolas.batista@email.com",
            name: "Nicolas Batista",
            phone: "(84) 97777-6666",
            birthDate: "1991-09-17T00:00:00.000Z",
            createdAt: "2024-04-11T17:45:00.000Z",
            updatedAt: "2024-04-11T17:45:00.000Z"
          },
          {
            id: 15,
            email: "olivia.souza@email.com",
            name: "Olívia Souza",
            phone: "(86) 91111-2222",
            birthDate: "1997-07-07T00:00:00.000Z",
            createdAt: "2024-04-12T08:30:00.000Z",
            updatedAt: "2024-04-12T08:30:00.000Z"
          },
          {
            id: 16,
            email: "paulo.cesar@email.com",
            name: "Paulo César",
            phone: "(88) 93333-4444",
            birthDate: "1984-04-11T00:00:00.000Z",
            createdAt: "2024-04-12T09:10:00.000Z",
            updatedAt: "2024-04-12T09:10:00.000Z"
          },
          {
            id: 17,
            email: "quezia.torres@email.com",
            name: "Quezia Torres",
            phone: "(89) 98888-7777",
            birthDate: "1993-11-23T00:00:00.000Z",
            createdAt: "2024-04-13T10:00:00.000Z",
            updatedAt: "2024-04-13T10:00:00.000Z"
          },
          {
            id: 18,
            email: "rafael.simoes@email.com",
            name: "Rafael Simões",
            phone: "(92) 95555-9999",
            birthDate: "1986-05-29T00:00:00.000Z",
            createdAt: "2024-04-13T11:20:00.000Z",
            updatedAt: "2024-04-13T11:20:00.000Z"
          },
          {
            id: 19,
            email: "sabrina.ribeiro@email.com",
            name: "Sabrina Ribeiro",
            phone: "(93) 96666-1212",
            birthDate: "1990-08-04T00:00:00.000Z",
            createdAt: "2024-04-13T12:45:00.000Z",
            updatedAt: "2024-04-13T12:45:00.000Z"
          },
          {
            id: 20,
            email: "thiago.martins@email.com",
            name: "Thiago Martins",
            phone: "(94) 90000-7777",
            birthDate: "1989-12-11T00:00:00.000Z",
            createdAt: "2024-04-14T09:00:00.000Z",
            updatedAt: "2024-04-14T09:00:00.000Z"
          }
        ],
        page: page,
        limit: limit,
        count: 20
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
