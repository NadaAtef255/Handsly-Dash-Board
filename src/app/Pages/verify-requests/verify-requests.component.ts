import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendingVerificationService } from '../../services/pending-verification.service';
import { PendingUsers } from '../../interfaces/pending-users';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-verify-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verify-requests.component.html',
  styleUrls: ['./verify-requests.component.css'],
})
export class VerifyRequestsComponent implements OnInit {
  private readonly _PendingVerificationService = inject(
    PendingVerificationService
  );
  private readonly _http = inject(HttpClient); // Inject HttpClient

  pendingUsers!: PendingUsers[];
  selectedUser: PendingUsers | null = null;

  ngOnInit(): void {
    this._PendingVerificationService.getPandingVerification().subscribe({
      next: (response) => {
        console.log(response);
        this.pendingUsers = response.data.users;
      },
    });
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
            // Refresh the pending users list or update UI accordingly
            this.pendingUsers = this.pendingUsers.filter(
              (user) => user._id !== this.selectedUser!._id
            );
            this.closeForm(); // Close the form after verification
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
            // Refresh the pending users list or update UI accordingly
            this.pendingUsers = this.pendingUsers.filter(
              (user) => user._id !== this.selectedUser!._id
            );
            this.closeForm(); // Close the form after rejection
          },
          error: (err) => {
            console.error('Rejection failed', err);
          },
        });
    }
  }
}
