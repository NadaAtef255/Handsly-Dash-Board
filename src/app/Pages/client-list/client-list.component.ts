// src/app/components/client-list/client-list.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../services/client.service';
import { RouterLink } from '@angular/router';
import { IClient } from '../../interfaces/client';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class ClientListComponent implements OnInit {
  private readonly _clientService = inject(ClientService);

  clients!: IClient[];

  ngOnInit(): void {
    console.log('Client List Component initialized');
    this._clientService.getClients().subscribe({
      next: (response) => {
        console.log(response);
        this.clients = response.data.clients;
      },
      error: (err) => {
        console.error('Error fetching clients:', err);
      }
    });
  }
}
