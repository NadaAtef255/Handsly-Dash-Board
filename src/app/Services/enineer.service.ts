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
export class EngineerService {
  private apiUrl = 'http://localhost:3000/api/v1/engineers/getAllEngineers';

  constructor(private http: HttpClient) {}

  getEngineers(): Observable<any[]> {
    return this.http.get<any[]>(
      'http://localhost:3000/api/v1/engineers/getAllEngineers'
    );
  }
  getEngineerById(id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/v1/getSingleEngineer/${id}`);
  }
}
