import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { IClientProfile } from '../../interfaces/client-profile';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-client-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './client-profile.component.html',
  styleUrl: './client-profile.component.css',
})
export class ClientProfileComponent implements OnInit {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _Router = inject(Router);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _clientService = inject(ClientService);

  clientId!: string;
  clientProfile!: IClientProfile;
  showUpdate: boolean = false;

  updateGroup: FormGroup = this._FormBuilder.group({
    fullName: ['', [Validators.pattern(/^([A-Z][a-z]+)(\s[A-Z][a-z]+){1,2}$/)]],
    email: ['', [Validators.email]],
    overview: ['', [Validators.pattern(/^[a-zA-Z\s]+$/)]],
    role: ['', [Validators.pattern(/^(client|admin)$/)]],
  });

  ngOnInit(): void {
    this.clientId = this._ActivatedRoute.snapshot.paramMap.get('id') as string;
    this._clientService.getClientById(this.clientId).subscribe({
      next: (response) => {
        this.clientProfile = response.data;
        console.log(response);
        this.updateGroup.patchValue({
          fullName: this.clientProfile.user.fullName,
          email: this.clientProfile.user.email,
          overview: this.clientProfile.overview,
          role: this.clientProfile.user.role,
        });
      },
      error: (err) => {
        console.error('Error fetching client profile:', err);
      },
    });
  }

  openUpdate() {
    this.showUpdate = true;
    this.updateGroup.patchValue({
      fullName: this.clientProfile.user.fullName,
      email: this.clientProfile.user.email,
      overview: this.clientProfile.overview,
      role: this.clientProfile.user.role,
    });
  }

  closeUpdate() {
    this.showUpdate = false;
  }

  saveClient() {
    if (this.updateGroup.valid) {
      const updatedData = this.updateGroup.value;
      this._clientService
        .updateClientById(this.clientId, updatedData)
        .subscribe({
          next: (response) => {
            this._ToastrService.success('Client updated successfully');
            this.clientProfile = { ...this.clientProfile, ...updatedData }; // Update local data
            this.closeUpdate(); // Close the update form
          },
          error: (error) => {
            console.error('Error updating client', error);
            this._ToastrService.error('Failed to update client');
          },
        });
      this.clientId = this._ActivatedRoute.snapshot.paramMap.get(
        'id'
      ) as string;

      this._clientService.getClientById(this.clientId).subscribe({
        next: (response) => {
          this.clientProfile = response.data;
          console.log(response);
          this.updateGroup.patchValue({
            fullName: this.clientProfile.user.fullName,
            email: this.clientProfile.user.email,
            overview: this.clientProfile.overview,
            role: this.clientProfile.user.role,
          });
        },
        error: (err) => {
          console.error('Error fetching client profile:', err);
        },
      });
    } else {
      this._ToastrService.warning('Please correct the form errors');
    }
  }

  deleteClientById() {
    this._clientService.deletClientById(this.clientId).subscribe({
      next: () => {
        this._ToastrService.success('Successfully', 'Client Deleted');
        setTimeout(() => {
          this._Router.navigate(['/clients']);
        }, 2000);
      },
      error: (error) => {
        console.error('Error deleting client', error);
        this._ToastrService.error('Failed to delete client');
      },
    });
  }
}
