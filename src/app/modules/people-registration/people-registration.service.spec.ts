import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PeopleRegistrationService } from './people-registration.service';
import { Person } from '../../models/person';
import { environment } from '../../../environments/environment';

describe('PeopleRegistrationService', () => {
  let service: PeopleRegistrationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PeopleRegistrationService]
    });

    service = TestBed.inject(PeopleRegistrationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPeople should make a GET request with the correct query parameters', () => {
    const page = 2;
    const limit = 5;

    service.getPeople(page, limit).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(
      `${environment.api}/persons?page=${page}&limit=${limit}`
    );
    expect(req.request.method).toBe('GET');
    req.flush({
      results: [],
      page,
      limit,
      count: 0
    });
  });

  it('getPerson should make a GET request to the correct URL', () => {
    const id = 123;

    service.getPerson(id).subscribe(person => {
      expect(person).toBeTruthy();
      expect(person.id).toBe(id);
    });

    const req = httpMock.expectOne(`${environment.api}/persons/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush({
      id,
      name: 'Tanjiro Kamado',
      email: 'tanjiro@demon-slayer.com',
      phone: '123456789',
      birthDate: '1969-03-11T00:00:00.000Z',
      createdAt: '2025-04-13T00:00:00.000Z',
      updatedAt: '2025-04-13T00:00:00.000Z'
    });
  });

  it('createPerson should make a POST request with the correct payload', () => {
    const newPerson: Person = {
      id: 0,
      name: 'Nezuko Kamado',
      email: 'nezuko@demon-slayer.com',
      phone: '999999999',
      birthDate: '1992-06-22T00:00:00.000Z',
      createdAt: '',
      updatedAt: ''
    };

    service.createPerson(newPerson).subscribe();

    const req = httpMock.expectOne(`${environment.api}/persons`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newPerson);
  });

  it('updatePerson should make a PATCH request with the correct payload', () => {
    const personId = 99;
    const updateData: Person = {
      id: personId,
      name: 'Zenitsu Agatsuma',
      email: 'zenitsu@demon-slayer.com',
      phone: '888888888',
      birthDate: '1996-10-25T00:00:00.000Z',
      createdAt: '2025-04-13T00:00:00.000Z',
      updatedAt: '2025-04-13T00:00:00.000Z'
    };

    service.updatePerson(personId, updateData).subscribe();

    const req = httpMock.expectOne(`${environment.api}/persons/${personId}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(updateData);
  });

  it('deletePerson should make a DELETE request to the correct endpoint', () => {
    const personId = 55;

    service.deletePerson(personId).subscribe();

    const req = httpMock.expectOne(`${environment.api}/persons/${personId}`);
    expect(req.request.method).toBe('DELETE');
  });
});
