// src/app/services/service.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IService } from '../interfaces/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = 'http://localhost:8000/api/v1/services'; // Adjust to your API endpoint

  constructor(private http: HttpClient) {}

  getServices(): Observable<{ data: { services: IService[] } }> {
    return this.http.get<{ data: { services: IService[] } }>(this.apiUrl);
  }

  getServiceById(serviceId: string): Observable<{ data: { service: IService } }> {
    return this.http.get<{ data: { service: IService } }>(`${this.apiUrl}/${serviceId}`);
  }

}
