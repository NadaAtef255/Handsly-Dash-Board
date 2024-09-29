import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendingVerificationService } from '../../services/pending-verification.service';
import { PendingUsers } from '../../interfaces/pending-users';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-verify-requests',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './verify-requests.component.html',
  styleUrls: ['./verify-requests.component.css'],
})
export class VerifyRequestsComponent implements OnInit {
  search: string = ''; // Initialize search
  private readonly _PendingVerificationService = inject(
    PendingVerificationService
  );
  private readonly _http = inject(HttpClient);

  pendingUsers: PendingUsers[] = []; // Initialize as an empty array
  filteredUsers: PendingUsers[] = []; // For storing filtered users
  paginatedUsers: PendingUsers[] = []; // Users displayed on the current page
  selectedUser: PendingUsers | null = null;

  currentPage: number = 1; // Current page
  pageSize: number = 10; // Number of users per page
  totalPages: number = 0; // Total number of pages

  ngOnInit(): void {
    this._PendingVerificationService.getPandingVerification().subscribe({
      next: (response) => {
        console.log(response);
        this.pendingUsers = response.data.users;
        this.filteredUsers = [...this.pendingUsers]; // Initialize filteredUsers
        this.sortUsers('newest'); // Sort users from newest to oldest initially
        this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
        this.updatePagination();
      },
    });
  }

  // Sort users based on the selected order
  sortUsers(order: 'newest' | 'oldest'): void {
    this.filteredUsers.sort((a, b) => {
      // Assuming `createdAt` is the date property of the user
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();

      return order === 'newest' ? dateB - dateA : dateA - dateB; // Sort based on selected order
    });
    this.currentPage = 1; // Reset to the first page after sorting
    this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
    this.updatePagination(); // Update pagination with sorted users
  }

  // Update the paginatedUsers list for the current page
  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

  // Filter users based on the search input
  searchUsers(): void {
    const searchTrimmed = this.search.trim();
    this.filteredUsers = searchTrimmed
      ? this.pendingUsers.filter((user) =>
          user.fullName.toLowerCase().includes(searchTrimmed.toLowerCase())
        )
      : [...this.pendingUsers]; // Show all users if search is empty

    this.sortUsers('newest'); // Re-sort users after searching
    this.currentPage = 1; // Reset to the first page when searching
    this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
    this.updatePagination(); // Update pagination with filtered users
  }

  preventNumberInput(event: KeyboardEvent): void {
    // Check if the key pressed is a number
    if (event.key >= '0' && event.key <= '9') {
      event.preventDefault(); // Prevent the default action (input)
    }
  }

  // ... other methods (updatePagination, sortUsers, etc.)

  // Navigate to the previous page
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  // Navigate to the next page
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  viewUser(user: PendingUsers): void {
    this.selectedUser = user;
  }

  closeForm(): void {
    this.selectedUser = null;
  }

  verifyUser(): void {
    if (this.selectedUser) {
      this._http
        .post(
          `http://localhost:8000/api/v1/verify/user/${this.selectedUser._id}`,
          { status: 'accepted' }
        )
        .subscribe({
          next: () => {
            // Remove the verified user and update the pagination
            this.pendingUsers = this.pendingUsers.filter(
              (user) => user._id !== this.selectedUser!._id
            );
            this.filteredUsers = [...this.pendingUsers]; // Update filteredUsers
            this.sortUsers('newest'); // Re-sort users after verification
            this.totalPages = Math.ceil(
              this.filteredUsers.length / this.pageSize
            );
            this.updatePagination();
            this.closeForm();
          },
          error: (err) => {
            console.error('Verification failed', err);
          },
        });
    }
  }

  rejectUser(): void {
    if (this.selectedUser) {
      this._http
        .post(
          `http://localhost:8000/api/v1/verify/user/${this.selectedUser._id}`,
          { status: 'rejected' }
        )
        .subscribe({
          next: () => {
            // Remove the rejected user and update the pagination
            this.pendingUsers = this.pendingUsers.filter(
              (user) => user._id !== this.selectedUser!._id
            );
            this.filteredUsers = [...this.pendingUsers]; // Update filteredUsers
            this.sortUsers('newest'); // Re-sort users after rejection
            this.totalPages = Math.ceil(
              this.filteredUsers.length / this.pageSize
            );
            this.updatePagination();
            this.closeForm();
          },
          error: (err) => {
            console.error('Rejection failed', err);
          },
        });
    }
  }
}
