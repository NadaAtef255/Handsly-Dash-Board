import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { IClientProfile } from '../../interfaces/client-profile';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-profile',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './client-profile.component.html',
  styleUrl: './client-profile.component.css'
})
export class ClientProfileComponent implements OnInit {

  private readonly _clientService = inject(ClientService);
  clientId!: string;
  clientProfile!: IClientProfile;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.clientId = this.route.snapshot.paramMap.get('id') as string;
    this._clientService.getClientById(this.clientId).subscribe({
      next: (response) => {
        this.clientProfile = response.data;
        console.log(response);

      },
      error: (err) => {
        console.error('Error fetching client profile:', err);
      }
    });
  }

}
