import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EngineerService {
  private readonly _HttpClient = inject(HttpClient);

  getEngineers(): Observable<any> {
    return this._HttpClient.get('http://localhost:8000/api/v1/engineer/all');
  }
  gerEngineerById(id: String): Observable<any> {
    return this._HttpClient.get(`http://localhost:8000/api/v1/engineer/${id}`);
  }
}
