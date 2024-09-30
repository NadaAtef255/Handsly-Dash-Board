import { Component, inject, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EngineerService } from '../../services/engineer.service';
import { IEngineer } from '../../interfaces/iengineer';
import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-engineer-profile',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './engineer-profile.component.html',
  styleUrl: './engineer-profile.component.css',
})
export class EngineerProfileComponent implements OnInit {
  private readonly _FormBuilder = inject(FormBuilder);
  showUpdate: Boolean = false;

  private readonly _ToastrService = inject(ToastrService);
  private readonly _Router = inject(Router);
  private readonly _ActivatedRoute = inject(ActivatedRoute);

  private readonly _EngineerService = inject(EngineerService);
  engineer!: IEngineer;

  updateGroup: FormGroup = this._FormBuilder.group({
    fullName: ['', [Validators.pattern(/^([A-Z][a-z]+)(\s[A-Z][a-z]+){1,2}$/)]],
    userName: ['', [Validators.pattern(/^[a-zA-Z0-9\s]{3,20}$/)]],
    email: ['', [Validators.email]],
    gender: ['', [Validators.pattern(/^(male|female)$/)]],
    role: ['', [Validators.pattern(/^(engineer|client|admin)$/)]],
    overview: ['', [Validators.pattern(/^[a-zA-Z\s]+$/)]],
    skills: [
      '',
      [
        Validators.pattern(
          /^[a-zA-Z]+[0-9]*([.]?[a-zA-Z0-9]+)*([,][a-zA-Z]+[0-9]*([.]?[a-zA-Z0-9]+)*)*$/
        ),
      ],
    ],
  });

  ngOnInit(): void {
    this._EngineerService
      .getEngineerById(this._ActivatedRoute.snapshot.params['id'])
      .subscribe({
        next: (response) => {
          this.engineer = response.data.engineer; // Storing the engineer data
          console.log(response.data);

          this.updateGroup.patchValue({
            fullName: this.engineer.user.fullName,
            email: this.engineer.user.email,
            gender: this.engineer.user.gender,
            role: this.engineer.user.role,
            overview: this.engineer.overview,
            skills: this.engineer.skills,
          });
        },
      });
  }

  deleteEngineerById() {
    this._EngineerService.deletEngineerById(this.engineer.user._id).subscribe({
      next: () => {
        this._ToastrService.success('Successfully', 'User Deleted');
        setTimeout(() => {
          this._Router.navigate(['/engineer-list']);
        }, 2000);
      },
    });
  }

  openUpdate() {
    this.showUpdate = true;
    this.updateGroup.patchValue({
      fullName: this.engineer.user.fullName,
      email: this.engineer.user.email,
      gender: this.engineer.user.gender,
      role: this.engineer.user.role,
      overview: this.engineer.overview,
      skills: this.engineer.skills,
    });
  }

  closeUpdate() {
    this.showUpdate = false;
  }

  saveEngineer() {
    if (this.updateGroup.valid) {
      const updatedData = this.updateGroup.value;
      this._EngineerService
        .updateEngineerById(this.engineer.user._id, updatedData)
        .subscribe({
          next: (response) => {
            this._ToastrService.success('Engineer updated successfully');
            this.engineer = { ...this.engineer, ...updatedData }; // Update local data
            this.closeUpdate(); // Close the update form
          },
          error: (error) => {
            console.error('Error updating engineer', error);
            this._ToastrService.error('Failed to update engineer');
          },
        });
      this._EngineerService
        .getEngineerById(this._ActivatedRoute.snapshot.params['id'])
        .subscribe({
          next: (response) => {
            this.engineer = response.data.engineer; // Storing the engineer data
            this.updateGroup.patchValue({
              fullName: this.engineer.user.fullName,
              email: this.engineer.user.email,
              gender: this.engineer.user.gender,
              role: this.engineer.user.role,
              overview: this.engineer.overview,
              skills: this.engineer.skills,
            });
          },
        });
    } else {
      this._ToastrService.warning('Please correct the form errors');
    }
  }
}