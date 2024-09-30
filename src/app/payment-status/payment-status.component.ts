import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-payment-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-status.component.html',
  styleUrl: './payment-status.component.css',
})
export class PaymentStatusComponent {}

// with interface
// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';

// interface Payment {
//   _id: string;
//   engineer: { fullName: string; email: string };
//   client: { fullName: string; email: string };
//   projectTitle: string;
//   totalAmount: number;
//   status: string;
// }

// @Component({
//   selector: 'app-admin-payments',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './admin-payments.component.html',
//   styleUrls: ['./admin-payments.component.css'],
// })
// export class PaymentStatusComponent implements OnInit {
//   payments: Payment[] = [];
//   paymentStatuses: string[] = ['Pending', 'Approved', 'Rejected'];
//   isLoading = false;

//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {
//     this.fetchPayments();
//   }

//   fetchPayments(): void {
//     this.isLoading = true;
//     this.http.get<Payment[]>('http://localhost:8000/api/payments').subscribe({
//       next: (response) => {
//         this.payments = response;
//         this.isLoading = false;
//       },
//       error: (err) => {
//         console.error('Failed to fetch payments', err);
//         this.isLoading = false;
//       },
//     });
//   }

//   handleStatusChange(event: Event, paymentId: string): void {
//     const newStatus = (event.target as HTMLSelectElement).value;
//     this.http.patch(`http://localhost:8000/api/payments/${paymentId}`, { status: newStatus }).subscribe({
//       next: () => {
//         this.fetchPayments(); // Refresh the payment list after update
//       },
//       error: (err) => {
//         console.error('Failed to update payment status', err);
//       },
//     });
//   }

//   approvePayment(paymentId: string): void {
//     this.updatePaymentStatus(paymentId, 'Approved');
//   }

//   rejectPayment(paymentId: string): void {
//     this.updatePaymentStatus(paymentId, 'Rejected');
//   }

//   updatePaymentStatus(paymentId: string, status: string): void {
//     this.http.patch(`http://localhost:8000/api/payments/${paymentId}`, { status }).subscribe({
//       next: () => {
//         this.fetchPayments(); // Refresh the payment list after update
//       },
//       error: (err) => {
//         console.error(`Failed to ${status} payment`, err);
//       },
//     });
//   }
// }
