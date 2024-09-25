import { IProposal } from '../../interfaces/proposal';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProposalService } from '../../services/proposal.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-proposals',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './proposals.component.html',
  styleUrl: './proposals.component.css'
})
export class ProposalsComponent implements OnInit {
  private readonly _proposalService = inject(ProposalService);

  proposals!: IProposal[];

  ngOnInit(): void {
    console.log('Proposals List Component initialized');
    this._proposalService.getProposals().subscribe({
      next: (response) => {
        console.log(response);
        this.proposals = response.data.proposals;
      },
      error: (err) => {
        console.error('Error fetching proposals:', err);
      }
    });
  }

}
