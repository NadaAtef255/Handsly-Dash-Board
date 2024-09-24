// src/app/services/client.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IClient } from '../interfaces/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:8000/api/v1/client/'; // Adjust to your API endpoint

  constructor(private http: HttpClient) {}

  getClients(): Observable<{ data: { clients: IClient[] } }> {
    return this.http.get<{ data: { clients: IClient[] } }>(this.apiUrl);
  }
}
