import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  engineers: IEngineer[] = [];
  filteredEngineers: IEngineer[] = [];
  paginatedEngineers: IEngineer[] = []; // Engineers on the current page
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 9; // Items per page
  totalPages: number = 0;

  ngOnInit(): void {
    this.fetchEngineers();
  }

  // Fetch engineers from the service
  fetchEngineers(): void {
    this._EngineerService.getEngineers().subscribe({
      next: (response) => {
        this.engineers = response.data.engineers;
        console.log(response);

        this.filteredEngineers = [...this.engineers];
        this.totalPages = Math.ceil(
          this.filteredEngineers.length / this.pageSize
        );
        this.updatePagination();
      },
      error: (err) => {
        console.error('Error fetching engineers:', err);
      },
    });
  }

  // Search and filter engineers based on the search term
  filterEngineers(): void {
    const term = this.searchTerm.trim().toLowerCase();

    // Filter only if the search term contains valid characters
    if (/^[a-zA-Z\s]*$/.test(term)) {
      this.filteredEngineers = this.engineers.filter((engineer) =>
        engineer.user.fullName.toLowerCase().includes(term)
      );
    } else {
      // Reset to show all engineers if the input is invalid
      this.filteredEngineers = [...this.engineers];
    }

    // Reset pagination when filtering
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredEngineers.length / this.pageSize);
    this.updatePagination();
  }

  // Update the pagination logic
  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedEngineers = this.filteredEngineers.slice(
      startIndex,
      endIndex
    );
  }

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

  // Check if there is a previous page
  hasPrevPage(): boolean {
    return this.currentPage > 1;
  }

  // Check if there is a next page
  hasNextPage(): boolean {
    return this.currentPage < this.totalPages;
  }
}
