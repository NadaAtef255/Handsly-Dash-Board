// src/app/services/client.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IClient } from '../interfaces/client';
import { IClientProfile } from '../interfaces/client-profile';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = 'http://localhost:8000/api/v1/client/'; // Adjust to your API endpoint

  constructor(private http: HttpClient) {}
  private readonly _HttpClient = inject(HttpClient);

  getClients(): Observable<{ data: { clients: IClient[] } }> {
    return this.http.get<{ data: { clients: IClient[] } }>(this.apiUrl);
  }
  getClientById(id: string): Observable<{ data: IClientProfile }> {
    return this.http.get<{ data: IClientProfile }>(
      `http://localhost:8000/api/v1/users/getUser/${id}`
    );
  }
  updateClientById(id: String, newValues: object): Observable<any> {
    return this._HttpClient.patch(
      `http://localhost:8000/api/v1/users/updateUser/${id}`,

      newValues
    );
  }
  deletClientById(id: String): Observable<any> {
    return this._HttpClient.delete(
      `http://localhost:8000/api/v1/users/deleteUser/${id}`
    );
  }
}
