import { Component, inject, OnInit } from '@angular/core';
import { IClient } from '../../interfaces/client';
import { ClientService } from '../../services/client.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, RouterLink,FormsModule],
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  private readonly _clientService = inject(ClientService);

  clients!: IClient[]; // List of all clients
  filteredClients!: IClient[]; // Filtered list based on search
  searchTerm: string = ''; // Value from input field

  ngOnInit(): void {
    console.log('Client List Component initialized');

    this._clientService.getClients().subscribe({
      next: (response) => {
        console.log(response);
        this.clients = response.data.clients;
        this.filteredClients = this.clients; // Initially all clients are displayed
      },
      error: (err) => {
        console.error('Error fetching clients:', err);
      }
    });
  }

  // Function to filter clients based on search term
  filterClients() {
    const term = this.searchTerm.toLowerCase();
    this.filteredClients = this.clients.filter(client =>
      client.user.fullName.toLowerCase().includes(term)
    );
  }
}
