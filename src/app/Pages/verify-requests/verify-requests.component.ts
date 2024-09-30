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
  search: string = '';
  fromDate: string = ''; // Start date for filtering
  toDate: string = ''; // End date for filtering
  private readonly _PendingVerificationService = inject(
    PendingVerificationService
  );
  private readonly _http = inject(HttpClient);

  pendingUsers: PendingUsers[] = [];
  filteredUsers: PendingUsers[] = [];
  paginatedUsers: PendingUsers[] = [];
  selectedUser: PendingUsers | null = null;

  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;

  ngOnInit(): void {
    this._PendingVerificationService.getPandingVerification().subscribe({
      next: (response) => {
        console.log(response);
        this.pendingUsers = response.data.users;
        this.filteredUsers = [...this.pendingUsers];
        this.sortUsers('newest');
        this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
        this.updatePagination();
      },
    });
  }

  // Sort users based on the selected order
  sortUsers(order: 'newest' | 'oldest'): void {
    this.filteredUsers.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();

      return order === 'newest' ? dateB - dateA : dateA - dateB;
    });
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
    this.updatePagination();
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
      : [...this.pendingUsers];

    this.sortUsers('newest');
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
    this.updatePagination();
  }

  preventNumberInput(event: KeyboardEvent): void {
    if (event.key >= '0' && event.key <= '9') {
      event.preventDefault();
    }
  }

  // Date filter method
  filterByDate(): void {
    if (this.fromDate || this.toDate) {
      this.filteredUsers = this.pendingUsers.filter((user) => {
        const userDate = new Date(user.createdAt).getTime();
        const from = this.fromDate ? new Date(this.fromDate).getTime() : null;
        const to = this.toDate ? new Date(this.toDate).getTime() : null;

        return (!from || userDate >= from) && (!to || userDate <= to);
      });
    } else {
      this.filteredUsers = [...this.pendingUsers];
    }

    this.sortUsers('newest');
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
    this.updatePagination();
  }

  // Sort by role
  sortByRole(order: 'clientToEngineer' | 'engineerToClient'): void {
    this.filteredUsers.sort((a, b) => {
      if (order === 'clientToEngineer') {
        return a.role.localeCompare(b.role);
      } else {
        return b.role.localeCompare(a.role);
      }
    });

    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
    this.updatePagination();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  viewUser(user: PendingUsers): void {
    this.selectedUser = user;
    console.log(this.selectedUser.profilePic, 'soraaaaaaaaaaaaaaaaaaaaaaaaa');
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
            this.pendingUsers = this.pendingUsers.filter(
              (user) => user._id !== this.selectedUser!._id
            );
            this.filteredUsers = [...this.pendingUsers];
            this.sortUsers('newest');
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
            this.pendingUsers = this.pendingUsers.filter(
              (user) => user._id !== this.selectedUser!._id
            );
            this.filteredUsers = [...this.pendingUsers];
            this.sortUsers('newest');
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
