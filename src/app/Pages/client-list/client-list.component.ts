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

  isValid: boolean = true;

  // Prevent the user from entering numbers
  preventNumbers(event: KeyboardEvent): void {
    const regex = /[0-9]/;  // التعبير المنتظم الذي يمثل الأرقام
    if (regex.test(event.key)) {
      event.preventDefault();  // منع إدخال الحرف إذا كان رقمًا
    }
  }

  // Function to filter clients based on search term
  filterClients(): void {
    const regex = /^[a-zA-Z\s]*$/;  // يسمح فقط بالحروف والمسافات
    if (!regex.test(this.searchTerm)) {
      this.isValid = false;  // Set validation flag to false if invalid input
      this.filteredClients = this.clients;  // Reset to all clients
      return;
    } else {
      this.isValid = true;  // Set validation flag to true if valid input
    }

    // Convert the search term to lowercase for case-insensitive comparison
    const term = this.searchTerm.toLowerCase();

    // Filter the clients list based on the full name
    this.filteredClients = this.clients.filter(client =>
      client.user.fullName.toLowerCase().includes(term)
    );
  }
}
