import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http'; // Importing this for error handling
import { EngineerService } from '../../services/engineer.service';
import { IEngineer } from '../../interfaces/iengineer';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-engineer-list',
  templateUrl: './engineer-list.component.html',
  styleUrls: ['./engineer-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
})
export class EngineersListComponent implements OnInit {
  private readonly _EngineerService = inject(EngineerService);

  engineers!: IEngineer[];
  filteredEngineers!: IEngineer[];
  searchTerm: string = '';

  ngOnInit(): void {
    console.log('Component initialized');
    this._EngineerService.getEngineers().subscribe({
      next: (response) => {
        console.log(response);
        this.engineers = response.data.engineers;
        this.filteredEngineers = this.engineers; // Ensure filteredEngineers is initialized
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error fetching engineers:', err);
        this.filteredEngineers = []; // Reset filteredEngineers on error if needed
      },
    });
  }

  isValid: boolean = true;

// Prevent the user from entering numbers
preventNumbers(event: KeyboardEvent): void {
  const regex = /[0-9]/;  
  if (regex.test(event.key)) {
    event.preventDefault();  // منع إدخال الحرف إذا كان رقمًا
  }
}

// Function to filter engineers based on the search term
filterEngineers(): void {
  const regex = /^[a-zA-Z\s]*$/;  // يسمح فقط بالحروف والمسافات

  // Check if the input consists only of letters (or spaces)
  if (regex.test(this.searchTerm)) {
    this.isValid = true;  // Set validation flag to true if input is valid
    const term = this.searchTerm.toLowerCase();

    // Filter engineers based on the valid search term
    this.filteredEngineers = this.engineers.filter(engineer =>
      engineer.user.fullName.toLowerCase().includes(term)
    );
  } else {
    this.isValid = false;  // Set validation flag to false if input is invalid
    this.filteredEngineers = this.engineers;  // Reset to show all engineers
  }
}
}
