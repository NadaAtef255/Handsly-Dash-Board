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

  engineers!: IEngineer[];
  filteredEngineers!: IEngineer[];
  searchTerm: string = '';

  ngOnInit(): void {
    console.log('Component initialized');
    this._EngineerService.getEngineers().subscribe({
      next: (response) => {
        console.log(response);

        this.engineers = response.data.engineers;
        this.filteredEngineers = this.engineers;
      },
      error: (err) => {
        console.error('Error fetching engineers:', err);
      },
    });
  }

  filterEngineers() {
    const term = this.searchTerm.toLowerCase();

    // Check if the input consists only of letters (or spaces)
    if (/^[a-zA-Z\s]*$/.test(term)) {
      this.filteredEngineers = this.engineers.filter((engineer) =>
        engineer.user.fullName.toLowerCase().includes(term)
      );
    } else {
      // Reset to show all engineers if input is invalid
      this.filteredEngineers = this.engineers;
    }
  }
}
