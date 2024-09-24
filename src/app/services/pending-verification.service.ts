import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PendingVerificationService {
  private readonly _HttpClient = inject(HttpClient);

  getPandingVerification(): Observable<any> {
    return this._HttpClient.get(
      'http://localhost:8000/api/v1/verify/pendingVerify'
    );
  }
}
