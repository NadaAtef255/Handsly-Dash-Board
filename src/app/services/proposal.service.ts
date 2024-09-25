// src/app/services/proposal.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProposal } from '../interfaces/proposal';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {
  private apiUrl = 'http://localhost:8000/api/v1/proposals/user/:${id}'; // Adjust to your API endpoint

  constructor(private http: HttpClient) {}

  getProposals(): Observable<{ data: { proposals: IProposal[] } }> {
    return this.http.get<{ data: { proposals: IProposal[] } }>(this.apiUrl);
  }
}
