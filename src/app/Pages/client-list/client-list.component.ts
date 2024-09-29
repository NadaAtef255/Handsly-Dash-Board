import { Component, inject, OnInit } from '@angular/core';
import { IClient } from '../../interfaces/client';
import { ClientService } from '../../services/client.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
})
export class ClientListComponent implements OnInit {
  private readonly _clientService = inject(ClientService);

  clients!: IClient[]; // List of all clients
  filteredClients!: IClient[]; // Filtered list based on search
  searchTerm: string = ''; // Value from input field

  // Pagination properties
  currentPage: number = 1; // Current page of pagination
  itemsPerPage: number = 5; // Number of clients to display per page
  totalPages: number = 1; // Total number of pages

  ngOnInit(): void {
    console.log('Client List Component initialized');

    this._clientService.getClients().subscribe({
      next: (response) => {
        console.log(response);
        this.clients = response.data.clients;
        this.filteredClients = this.clients;
        this.totalPages = Math.ceil(
          this.filteredClients.length / this.itemsPerPage
        );
      },
      error: (err) => {
        console.error('Error fetching clients:', err);
      },
    });
  }

  // Function to filter clients based on search term
  filterClients() {
    const term = this.searchTerm.toLowerCase();
    this.filteredClients = this.clients.filter((client) =>
      client.user.fullName.toLowerCase().includes(term)
    );

    // Update pagination after filtering
    this.totalPages = Math.ceil(
      this.filteredClients.length / this.itemsPerPage
    );
    this.currentPage = 1; // Reset to first page after search
  }

  // Function to get clients for the current page
  getPaginatedClients(): IClient[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredClients.slice(startIndex, endIndex);
  }

  // Function to change page
  changePage(page: number) {
    this.currentPage = page;
  }

  // Function to check if previous page exists
  hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }

  // Function to check if next page exists
  hasNextPage(): boolean {
    return this.currentPage < this.totalPages;
  }
}
