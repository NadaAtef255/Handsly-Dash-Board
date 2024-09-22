import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface Engineer {
  _id: string;
  education: {
    title: string;
    startDate: string;
    endDate: string;
  };
  verifiedStatus: string;
  user: {
    _id: string;
    fullName: string;
    email: string;
    role: string;
  };
  title: string;
  overview: string;
  skills: string[];
  profilePic: string;
}

interface ApiResponse {
  status: string;
  results: number;
  data: {
    engineers: Engineer[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class EngineerService {
  private apiUrl = 'http://localhost:8000/api/v1/engineer/all';

  constructor(private http: HttpClient) {}

  getEngineers(): Observable<Engineer[]> {
    return this.http.get<ApiResponse>(this.apiUrl).pipe(
      tap((response) => console.log('API Response:', response)),
      map((response: ApiResponse) => response.data.engineers)
    );
  }
}
