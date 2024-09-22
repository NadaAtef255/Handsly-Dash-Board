import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// export interface fEngineer {
//   message:string;
//   engineers: Engineer{};
// }
export interface Engineer {
  portfolio: string;
  certifications: string[];
  education: {
    title: string;
    startDate: Date;
    endDate: Date;
  };
  specialization: string[];
  skills: string[];
  verifiedStatus: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = 'http://localhost:3000/api/v1/clients/getAllClients';

  constructor(private http: HttpClient) {}

  getClients(): Observable<any[]> {
    return this.http.get<any[]>(
      'http://localhost:3000/api/v1/clients/getAllClients'
    );
  }
  getClientById(id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/v1/getClientById/${id}`);
  }
}
